"""Create your views here"""

from email import message
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

    # Try to get latest, if DNE, return null Status Model
    def get_object(self):
        try:
            return self.request.user.patient.statuses.latest('date')
        except:
            pass

class SpecificLatestStatusView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StatusSerializer

    # Try to get latest, if DNE, return null Status Model
    def get_object(self):
        pid = self.kwargs['pk']

        try:
            return self.request.user.doctor.patients.get(user_id=pid).statuses.latest('date')
        except:
            pass
        
# Update the Notification's status view
class NotificationView(viewsets.ModelViewSet):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.notifications.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AddressView(viewsets.ModelViewSet):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = AddressSerializer

    def get_queryset(self):
        return self.request.user.patient.addresses.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user.patient)

#returns all users who have a matching adres with current user
class PatientsWithMatchingAddressView(generics.ListAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PatientSerializer

    def get_queryset(self):
        postalCodes = self.request.user.patient.addresses.all().values_list('postalCode', flat=True)        
        addresses =  Address.objects.filter(postalCode__in = postalCodes)
    
        patients = []
        for address in addresses:
            if (self.request.user.patient != address.patient and address.patient not in patients) :
                patients.append(address.patient)
        
        for patient in patients:
            n = Notification(
                    type = "InfectedAlert", 
                    user = patient.user, 
                    subject = "Contact tracing", 
                    message = "Someone who visits spots you frequent has become infected! Please monitor your symptoms"
                )
            n.save()

        return patients

#returns all users who have a matching address with current user
class TogglePriorityView(generics.UpdateAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PatientSerializer

    def update(self, request, *args, **kwargs):
        pid = self.kwargs['pk']
        patient = self.request.user.doctor.patients.get(user_id=pid)
        priority = patient.is_priority
        patient.is_priority = not priority
        patient.save()

        return Response(
            {
                "msg": f'Patient priority is set to {not priority}.'
            }
        )
        




