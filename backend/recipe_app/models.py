from django.db import models

# Create your models here.
from django.db import models

CATEGORY_CHOICES = [
    ('veg', 'Vegetarian'),
    ('non-veg', 'Non-Vegetarian'),
    ('dessert', 'Dessert'),
]

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    ingredients = models.TextField()
    steps = models.TextField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_tried = models.BooleanField(default=False)

    def __str__(self):
        return self.title
