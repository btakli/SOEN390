from rest_framework import mixins, viewsets
from companion_api.models import *
from companion_api.serializers import *

# Create your views here.

class CreateListRetrieveDestroyUpdateViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    pass

class PersonView(CreateListRetrieveDestroyUpdateViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    pass
