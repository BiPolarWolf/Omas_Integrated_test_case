from django.urls import path , include , re_path
from .views import list_animals,animals_breed


app_name = 'animals'

urlpatterns = [
    path('animals/',list_animals,name='animals_list'),
    path('breed/<int:id>',animals_breed,name='breed')
]

