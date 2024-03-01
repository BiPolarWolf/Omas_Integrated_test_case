from .models import Breed


def breeds(request):
    return {'breeds': Breed.objects.all()}