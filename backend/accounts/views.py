from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import *

# Regiser Doctor View
class RegisterDoctorView(generics.GenericAPIView):
    serializer_class = RegisterDoctorSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        return Response(
            {
                "doctor": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(doctor.user)[
                    1
                ],  # Create token based on user
            },
            status=status.HTTP_201_CREATED
        )

# Regiser Patient View
class RegisterPatientView(generics.GenericAPIView):
    serializer_class = RegisterPatientSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = serializer.save()
        return Response(
            {
                "patient": PatientSerializer(
                    patient, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(patient.user)[
                    1
                ],  # Create token based on user
            },
            status=status.HTTP_201_CREATED
        )

# Login Doctor View
class LoginDoctorView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data) 
        doctor = Doctor.objects.get(user_id=user.id)
        return Response(
            {
                "doctor": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[
                    1
                ],  # Create token based on user
            }
        )

# Login Patient View
class LoginPatientView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data) 
        patient = Patient.objects.get(user_id=user.id)
        return Response(
            {
                "patient": PatientSerializer(
                    patient, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[
                    1
                ],  # Create token based on user
            }
        )

# Get User View
class UserView(generics.RetrieveAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Get Doctor View
class DoctorView(generics.RetrieveAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = DoctorSerializer

    def get_object(self):
        return self.request.user.doctor

# Get Patient View
class PatientView(generics.RetrieveAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PatientSerializer

    def get_object(self):
        return self.request.user.patient

# Get Patients of Doctor View
class DoctorPatientsView(viewsets.ModelViewSet):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PatientSerializer

    def get_queryset(self):
        return self.request.user.doctor.patients.all()