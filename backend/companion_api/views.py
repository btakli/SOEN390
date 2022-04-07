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
        patients_query_set2 = self.request.user.doctor.temp_patients.all()
        for patient_model in patients_query_set:
            patient = PatientSerializer(patient_model).data
            patient['email'] = patient_model.user.email
            patients.append(patient)
        
        for patient_model in patients_query_set2:
            patient = PatientSerializer(patient_model).data
            patient['email'] = patient_model.user.email
            patients.append(patient)

        return Response(patients)

class PatientDoctorView(generics.GenericAPIView):
    """Patient Doctor View"""

    # only authenticated doctors can see their patients
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # Making my own custom get
    def get(self, request, *args, **kwargs):

        doctor_model = self.request.user.patient.doctor
        doctor = DoctorSerializer(doctor_model).data
        doctor['email'] = doctor_model.user.email     

        return Response(doctor)

# Get Immigrants of Officer View
class OfficerImmigrantView(generics.GenericAPIView):
    """Officer Immigrants View"""

    permission_classes = [
        permissions.IsAuthenticated
    ]

    # Making my own custom get
    def get(self, request, *args, **kwargs):
        immigrants = []

        immigrants_query_set = self.request.user.immigrationofficer.immigrants.all()
        for immigrant_model in immigrants_query_set:
            immigrant = PatientSerializer(immigrant_model).data
            immigrant['email'] = immigrant_model.user.email
            immigrants.append(immigrant)

        return Response(immigrants)

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
            # FOR DOCTORS
            try:
                return self.request.user.doctor.patients.get(user_id=pid).statuses.latest('date')
            except Patient.DoesNotExist:
                return self.request.user.doctor.temp_patients.get(user_id=pid).statuses.latest('date')
        except:
            # FOR IMM. OFFICERS
            try:
                return self.request.user.immigrationofficer.immigrants.get(user_id=pid).statuses.latest('date')
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

#returns all users who have a matching adress with current user
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

class TogglePriorityView(generics.UpdateAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PatientSerializer

    def update(self, request, *args, **kwargs):
        pid = self.kwargs['pk']
        if (self.request.user.is_doctor):  
            try:
                patient = self.request.user.doctor.patients.get(user_id=pid)
            except Patient.DoesNotExist:
                patient = self.request.user.doctor.temp_patients.get(user_id=pid)
                
            priority = patient.is_priority
            patient.is_priority = not priority
            patient.save()

            return Response(
                {
                    "msg": f'Patient priority is set to {not priority}.'
                }
            )
        immigrant = self.request.user.immigrationofficer.immigrants.get(user_id=pid)
        priority = immigrant.is_immigration_priority
        immigrant.is_immigration_priority = not priority
        immigrant.save()

        return Response(
            {
                "msg": f'Immigrant priority is set to {not priority}.'
            }
        )
        
class ToggleAwayView(generics.UpdateAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = DoctorSerializer

    def update(self, request, *args, **kwargs):
        doctor = self.request.user.doctor
        is_away = doctor.is_away

        if(is_away):
            doctor.is_away = False
            doctor.save()            
            patients = self.request.user.doctor.patients.all()
            for patient in patients:
                patient.temp_doctor = None
                patient.save()
                n = Notification(
                    type = "Assignment", 
                    user = patient.user, 
                    subject = "Your Doctor Is Back", 
                    message = "Your doctor: Dr." + doctor.first_name + " " + doctor.last_name + " is back from his emergency leave. He is now again your "+
                    "current doctor."
                )
                n.save()
        else:
            doctor.is_away = True
            doctor.save()

        return Response(
            {
                "msg": f'Doctor is_away is set to {not is_away}.'
            }
        )

class ReassignPatientsToTempDoctorView(generics.GenericAPIView):
    # only Admin users can get access

    permission_classes = [
        permissions.IsAdminUser
    ]

    def put(self, request, *args, **kwargs):
        did = self.kwargs['doc']
        tdid = self.kwargs['tempdoc']
        start_date = self.kwargs['startdate']
        end_date = self.kwargs['enddate']
        
        try:
            tempDoctor = Doctor.objects.get(user_id=tdid)
            doctor = Doctor.objects.get(user_id=did)
            patients = doctor.patients.all()
            for patient in patients:
                patient.temp_doctor = tempDoctor
                patient.save()
                n = Notification(
                    type = "Assignment", 
                    user = patient.user, 
                    subject = "New Temporary Doctor Assignment", 
                    message = "Your doctor: Dr." + doctor.first_name + " " + doctor.last_name + " had an emergency leave. You have "+
                    "been asssigned a new temporary doctor: Dr." + tempDoctor.first_name + " " + tempDoctor.last_name + " from " + start_date +
                    " to " + end_date
                )
                n.save()
        except:
            pass
          
        return Response(
            {
                "msg": f"{tempDoctor} has been assigned to {doctor}'s patients."
            }
        )
      
class AppointmentView(viewsets.ModelViewSet):
    """Appointment View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        try:
            return self.request.user.patient.appointments.all()
        except Patient.DoesNotExist:
            return  self.request.user.doctor.appointments.all()

class AvailabilityView(viewsets.ModelViewSet):
    """Availability View"""

    # only authenticated users can see their patients
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class = AvailabilitySerializer
    
    def get_queryset(self):
        try:
            return self.request.user.patient.doctor.availabilities.all()
        except Patient.DoesNotExist:
            return self.request.user.doctor.availabilities.all()

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user.doctor)
