from django.contrib import admin
from .models import Animal,AnimalType,Breed,Weighting

admin.site.register(Animal)
admin.site.register(Breed)
admin.site.register(Weighting)
admin.site.register(AnimalType)