from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .serializers import AnimalSerializer, BreedSerializer ,AnimalTypeSerializer
from rest_framework.permissions import IsAuthenticated
from .models import AnimalType,Animal,Breed,Weighting

class AnimalsViewSet(ModelViewSet):
    queryset = Animal.objects.all() 
    serializer_class = AnimalSerializer

class BreedViewSet(ModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    

class AnimalTypeViewSet(ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer
