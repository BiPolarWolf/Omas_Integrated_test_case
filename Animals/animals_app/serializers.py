import datetime
from django.core import serializers
from rest_framework.serializers import ModelSerializer
from animals_app import models
from django.utils import timezone,formats 
from dateutil.relativedelta import relativedelta
from rest_framework.serializers import SerializerMethodField




class AnimalSerializer(ModelSerializer):
    is_in_months = SerializerMethodField()
    breed_info = SerializerMethodField()
    parent_info = SerializerMethodField()

    class Meta:
        model = models.Animal
        fields = tuple("id,inventory_number,nickname,date_arrival,is_in_months,breed_info,breed,sex,parent,parent_info".split(','))


    def get_breed_info(self,obj):
        return obj.breed.__str__()
    
    def get_parent_info(self,obj):
        if obj.parent:
            return obj.parent.__str__()
        return 'Отсутствует'

    def validate(self, data):
        if data.get('parent') is not None:
            parent_id = data.get('parent').id
            parent = models.Animal.objects.filter(id=parent_id).first()  
            print(data)
            if parent:
                if parent.breed != data.get('breed') or parent.sex != 'W':
                    raise serializers.ValidationError('Порода не совпадает с родителем')
        return data
    


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
    type_info = SerializerMethodField()

    class Meta:
        model = models.Breed
        fields = tuple("id,name,type_info".split(','))

    def get_type_info(self,obj):
        return obj.type.__str__()


class AnimalTypeSerializer(ModelSerializer):
    class Meta:
        model = models.AnimalType
        fields = '__all__'


class WeightingSerializer(ModelSerializer):
    animal_info = SerializerMethodField()
    class Meta:
        model = models.Weighting
        fields = tuple("id,weighting_date,weight_kg,animal_info,animal".split(','))

    def get_animal_info(self,obj):
        return obj.animal.__str__()