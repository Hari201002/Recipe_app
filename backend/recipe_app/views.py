from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from .models import Recipe
from .serializers import RecipeSerializer
from django.conf import settings
from difflib import get_close_matches
import spacy

# ✅ Load spaCy model
nlp = spacy.load("en_core_web_sm")
genai.configure(api_key=settings.GEMINI_API_KEY)
# ✅ ViewSet for API /recipes/
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'ingredients']
    filterset_fields = ['category', 'is_tried']

# ✅ NLP utility functions
def extract_nouns(text):
    doc = nlp(text.lower())
    return [token.lemma_ for token in doc if token.pos_ == 'NOUN']

def fuzzy_match(word, options, cutoff=0.6):
    match = get_close_matches(word, options, n=1, cutoff=cutoff)
    return match[0] if match else None



@api_view(['GET'])
def suggest_recipes(request):
    query = request.query_params.get('ingredients', '')
    if not query:
        return Response([])

    try:
        prompt = (
            f"Suggest 5 modern recipes using these ingredients: {query}.\n\n"
            "For each recipe, provide:\n"
            "1. Recipe Title\n"
            "2. Ingredients (as a list)\n"
            "3. Step-by-step instructions \n\n"
            "Return in this structured JSON format:\n"
            "[{\"title\": \"Title\", \"ingredients\": [\"item1\", \"item2\"], \"instructions\": [\"Step 1\", \"Step 2\"]}]"
        )

        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)

        # Gemini sometimes returns formatted code blocks
        text = response.text.strip()
        if text.startswith("```json"):
            text = text.split("```json")[1].split("```")[0].strip()
        elif text.startswith("```"):
            text = text.split("```")[1].strip()

        import json
        recipes = json.loads(text)

        return Response({"ai_suggestions": recipes})

    except Exception as e:
        return Response({"error": str(e)}, status=500)

