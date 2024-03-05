from django.urls import reverse
from django.db import models
from django.utils import formats,timezone
from django.core.exceptions import ValidationError
# Create your models here.



class AnimalType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип'
        verbose_name_plural = 'Типы'


class Breed(models.Model):
    name = models.CharField(max_length=100,unique=True)
    type = models.ForeignKey(AnimalType, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.type.name} породы {self.name}'


    class Meta:
        verbose_name = 'Порода'
        verbose_name_plural = 'Породы'

    def get_absolute_url(self):
        return reverse('animals:breed',kwargs={'id':self.id})

class Animal(models.Model):

    class Sex(models.TextChoices):
        MALE = 'M', 'Мужской'
        FEMALE = 'W', 'Женский'

    breed = models.ForeignKey(Breed,on_delete=models.SET_NULL,null=True)
    inventory_number = models.CharField(max_length=20, unique=True)
    sex = models.CharField(max_length=1,choices=Sex.choices,default=Sex.FEMALE)
    nickname = models.CharField(max_length=50)
    date_arrival = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self',on_delete=models.SET_NULL,blank=True,null=True)

    @property
    def is_in_months(self):
        months = formats.date_format((timezone.now() - self.date_arrival),'%m-%S')
        return months

    class Meta:
        ordering = ['-date_arrival','nickname']
        indexes = [models.Index(fields=['date_arrival','nickname']),]
        verbose_name = 'Животное'
        verbose_name_plural = 'Животные'
    
    def __str__(self):
        return self.nickname

    def clean(self):
        if self.parent:
            if self.parent.breed != self.breed:
                raise ValidationError('Родитель должен быть той же породы')

            if self.parent.sex != self.sex:
                raise ValidationError('Родителем может быть только женского пола')

    



class Weighting(models.Model):
    animal = models.ForeignKey(Animal,on_delete=models.CASCADE)
    weighting_date = models.DateField(default = timezone.now)
    weight_kg = models.FloatField(verbose_name='Вес')


    class Meta:
        unique_together = ('weighting_date','animal')
        ordering = ['-weighting_date']
        indexes = [models.Index(fields=['animal','weighting_date']),]

        # constraints = [
        #     models.UniqueConstraint(fields=['weighting_date', 'animal'], name='unique_weighting_per_animal_per_day'),
        # ]
        verbose_name = 'Взвешивание'
        verbose_name_plural = 'Взвешивания'

    

    def __str__(self):
            return f'{self.weighting_date} - {self.animal.nickname}'