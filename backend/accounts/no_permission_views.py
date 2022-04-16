from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import UserSerializer, DoctorSerializer, ImmigrationOfficerSerializer, PatientSerializer
from .no_permission_serializers import *

# Register Immigration Officer View for Test
# No email or Admin approval needed
class RegisterImmigrationOfficerTestView(generics.GenericAPIView):
    serializer_class = RegisterImmigrationOfficerTestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        immigrationOfficer = serializer.save()
        user = immigrationOfficer.user
        token = AuthToken.objects.create(immigrationOfficer.user)[1]

        return Response(
            {
                "user_data": ImmigrationOfficerSerializer(
                    immigrationOfficer, context=self.get_serializer_context()
                ).data,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
                "msg": 'An Email has been sent to an Admin to approve your request'
            },
            status=status.HTTP_201_CREATED
        )

# Register Doctor View for Test
# No email or Admin approval needed
class RegisterDoctorTestView(generics.GenericAPIView):
    serializer_class = RegisterDoctorTestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        user = doctor.user
        token = AuthToken.objects.create(doctor.user)[1]

        return Response(
            {
                "user_data": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
                "msg": 'An Email has been sent to an Admin to approve your request'
            },
            status=status.HTTP_201_CREATED
        )

# Register Patient View for Test
# No email approval needed
class RegisterPatientTestView(generics.GenericAPIView):
    serializer_class = RegisterPatientTestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = serializer.save()
        user = patient.user
        token = AuthToken.objects.create(user)[1]

        return Response(
            {
                "user_data": PatientSerializer(
                    patient, context=self.get_serializer_context()
                ).data,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
            },
            status=status.HTTP_201_CREATED
        )