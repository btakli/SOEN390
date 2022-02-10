"""Create your views here"""

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
    """Person View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.patients.all()

    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
