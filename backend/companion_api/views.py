"""Create your views here"""

from rest_framework import viewsets, permissions, generics
from .models import *
from .serializers import *
from accounts.serializers import *

class PersonView(viewsets.ModelViewSet):
    """Person View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.items.all()

    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Get Patients of Doctor View
class DoctorPatientView(viewsets.ModelViewSet):
    """Doctor Patients View"""

    # only authenticated doctors can see their patients
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PatientSerializer

    def get_queryset(self):
        return self.request.user.doctor.patients.all()

# Update the Patient's status view
class PatientStatusView(viewsets.ModelViewSet):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StatusSerializer

    def get_queryset(self):
        return self.request.user.patient.statuses.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user.patient)

class LatestStatusView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StatusSerializer

    def get_object(self):
        return self.request.user.patient.statuses.latest('date')

class SpecificLatestStatusView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StatusSerializer

    def get_object(self):
        pid = self.kwargs['pk']

        try:
            return self.request.user.doctor.patients.get(user_id=pid).statuses.latest('date')
        except:
            pass