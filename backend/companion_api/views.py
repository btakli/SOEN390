'''Create your views here'''

from rest_framework import viewsets, permissions
from companion_api.models import *
from companion_api.serializers import *


# class CreateListRetrieveDestroyUpdateViewSet(
#     mixins.CreateModelMixin,
#     mixins.ListModelMixin,
#     mixins.RetrieveModelMixin,
#     mixins.DestroyModelMixin,
#     mixins.UpdateModelMixin,
#     viewsets.GenericViewSet,
# ):
#     '''Inheritance class'''

#     pass


class PersonView(viewsets.ModelViewSet):
    '''Person View'''

    queryset = Person.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PersonSerializer
