import datetime
from rest_framework.serializers import ModelSerializer
from animals_app import models
from django.utils import timezone,formats 
from dateutil.relativedelta import relativedelta
from rest_framework.serializers import SerializerMethodField



class AnimalSerializer(ModelSerializer):
    is_in_months = SerializerMethodField()

    class Meta:
        model = models.Animal
        fields = tuple("inventory_number,nickname,date_arrival,is_in_months,breed,sex,parent".split(','))

    def get_is_in_months(self,obj):
        current_time = timezone.now()
        delta = relativedelta(current_time, obj.date_arrival)
        months = delta.years * 12 + delta.months
        days = delta.days
        return f'{months} месяцев и {days} дней'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date_arrival'] = instance.date_arrival.strftime("%Y-%m-%d %H:%M:%S")
        return representation



class BreedSerializer(ModelSerializer):
    class Meta:
        model = models.Breed
        fields = "__all__"


class AnimalTypeSerializer(ModelSerializer):
    class Meta:
        model = models.AnimalType
        fields = '__all__'


