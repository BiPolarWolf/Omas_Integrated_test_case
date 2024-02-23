
from django_filters import rest_framework as filters

from .models import Animal

class AnimalFilter(filters.FilterSet):
    type = filters.CharFilter(field_name='breed__type__name', lookup_expr='icontains')
    breed = filters.CharFilter(field_name='breed__name',lookup_expr='icontains')
    nickname = filters.CharFilter(field_name='nickname',lookup_expr='icontains')

    class Meta:
        model = Animal
        fields = ['type','breed','nickname']