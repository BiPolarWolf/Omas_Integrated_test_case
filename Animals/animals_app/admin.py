from django.contrib import admin
from .models import Animal,AnimalType,Breed,Weighting



admin.site.register(Breed)
admin.site.register(AnimalType)




class AnimalAdmin(admin.ModelAdmin):
    list_display = ('nickname', 'inventory_number', 'breed','parent')

admin.site.register(Animal,AnimalAdmin)


class WeightingAdmin(admin.ModelAdmin):
    list_display = ('weight_kg', 'animal','weighting_date')


admin.site.register(Weighting,WeightingAdmin)