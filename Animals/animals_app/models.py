from enum import unique
from operator import index
from tabnanny import verbose
from django.db import models
from django.utils import formats,timezone
# Create your models here.

class AnimalType(models.Model):
    animal_type = models.CharField(max_length=100)


class Breed(AnimalType):
    animal_breed = models.CharField(max_length=100)

 

class Animal(Breed):

    class Sex(models.TextChoices):
        MALE = 'M', 'Мужской'
        FEMALE = 'W', 'Женский'


    inventory_number = models.CharField(max_length=20, unique=True)
    sex = models.CharField(max_length=1,choices=Sex.choices,default=Sex.FEMALE)
    nickname = models.CharField(max_length=50)
    date_arrival = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True)

    @property
    def is_in_months(self):
        months = formats.date_format((timezone.now() - self.date_arrival),'%m-%S')
        return months

    class Meta:
        ordering = ['date_arrival','nickname']
        indexes = [models.Index(fields=['date_arrival','nickname']),]



class Weighting(models.Model):
    animal = models.ForeignKey(Animal,on_delete=models.CASCADE)
    weighting_date = models.DateField(auto_now_add = True , unique=True)
    weight_kg = models.FloatField(verbose_name='Вес')

    class Meta:
        ordering = ['-weighting_date']
        indexes = [models.Index(fields=['weight_kg']),]




