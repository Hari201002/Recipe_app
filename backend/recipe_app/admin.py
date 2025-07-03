from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_tried')
    list_filter = ('category', 'is_tried')
    search_fields = ('title', 'ingredients')
