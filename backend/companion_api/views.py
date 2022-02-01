'''Create your views here'''

from rest_framework import mixins, viewsets
from companion_api.models import *
from companion_api.serializers import *


class CreateListRetrieveDestroyUpdateViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    '''Inheritance class'''

    pass


class PersonView(CreateListRetrieveDestroyUpdateViewSet):
    '''Person View'''

    queryset = Person.objects.all()
    serializer_class = PersonSerializer
