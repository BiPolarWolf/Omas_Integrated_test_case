
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .models import AnimalType,Animal,Breed,Weighting
from .filters import AnimalFilter



# -*- coding: utf-8 -*-


class AnimalsViewSet(ModelViewSet):
    queryset = Animal.objects.all() 
    serializer_class = AnimalSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AnimalFilter

    # def list(self, request, *args, **kwargs):
    #     # Логирование параметров запроса
    #     self.log_request_params(request)
    #     return super().list(request, *args, **kwargs)
    
    # def log_request_params(self, request):
    #     query_params = request.query_params
    #     # Запись параметров запроса в лог
    #     print(f"Query params: {query_params}")

class BreedViewSet(ModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    

class AnimalTypeViewSet(ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer


class WeightingViewSet(ModelViewSet):
    queryset = Weighting.objects.all()
    serializer_class = WeightingSerializer
