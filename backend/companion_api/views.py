"""Create your views here"""

from msilib.schema import Error
from urllib import request
from rest_framework import viewsets, permissions, generics
from .models import *
from .serializers import *
from accounts.serializers import *
from rest_framework.response import Response
from rest_framework import status


class PersonView(viewsets.ModelViewSet):
    """Person View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.items.all()

    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DoctorPatientView(viewsets.ModelViewSet):
    """Patients View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = DoctorSerializer

    def get_queryset(self):
        #doctorId = self.request.user.id
        return self.request.user.doctor.patients.all()

# Update the Patient's status view
class PatientStatusView(viewsets.ModelViewSet):
    # only authenticated users can get access
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = StatusSerializer

    def get_queryset(self):
      return self.request.user.patient.statuses.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user.patient)

class SpecificLatestStatusView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = StatusSerializer

    def get_object(self):
        patientID = self.kwargs['pk']
        #print(patientID)
        try:
            return Status.objects.filter(patient__user_id = patientID).latest('date')
        except:
            pass

class LatestStatusView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = StatusSerializer

    def get_object(self):
        patientID = self.request.user.id
        return Status.objects.filter(patient__user_id = patientID).latest('date')