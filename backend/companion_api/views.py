"""Create your views here"""

from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
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

# # Get Patients of Doctor View
# class DoctorPatientView(viewsets.ModelViewSet):
#     """Doctor Patients View"""

#     # only authenticated doctors can see their patients
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     serializer_class = PatientSerializer

#     def get_queryset(self):
#         return self.request.user.doctor.patients.all()

# Get Patients of Doctor View
class DoctorPatientView(generics.GenericAPIView):
    """Doctor Patients View"""

    # only authenticated doctors can see their patients
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # Making my own custom get
    def get(self, request, *args, **kwargs):
        patients = []

        patients_query_set = self.request.user.doctor.patients.all()
        for patient_model in patients_query_set:
            patient = PatientSerializer(patient_model).data
            patient['email'] = patient_model.user.email
            patients.append(patient)

        return Response(patients)

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