
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .models import AnimalType,Animal,Breed,Weighting
from .filters import AnimalFilter
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ParseError
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

class CustomJSONParser(JSONParser):
    """
    Пользовательский парсер, который обрабатывает только JSON данные.
    Если данные не являются JSON, выбрасывается исключение ParseError.
    """
    def parse(self, stream, media_type=None, parser_context=None):
        try:
            return super().parse(stream, media_type, parser_context)
        except ParseError as exc:
            raise ParseError("Данные запроса должны быть в формате JSON.")


# -*- coding: utf-8 -*-


class AnimalsViewSet(ModelViewSet):
    queryset = Animal.objects.all() 
    serializer_class = AnimalSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AnimalFilter

    parser_classes = [CustomJSONParser]

class BreedViewSet(ModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    

class AnimalTypeViewSet(ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer


    parser_classes = [CustomJSONParser]


class WeightingViewSet(ModelViewSet):
    queryset = Weighting.objects.all()
    serializer_class = WeightingSerializer


    parser_classes = [CustomJSONParser]


def list_animals(request):
    animals = Animal.objects.all()
    return render(request,'animals/animals_list.html',{'animals':animals})


def animals_breed(request,id):
    animals = Animal.objects.filter(breed = id)
    return render(request,'animals/animals_list.html',{'animals':animals})