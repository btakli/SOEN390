from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .serializers import *

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.conf import settings
from .utils import generate_token

# # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
# def send_verif_email(user_type, request):
#     current_site = get_current_site(request)
#     email_subject = 'Activate Covid-Tracker Account'
#     email_body = render_to_string('email/activate_email.html', {
#         'name': str(user_type),
#         'domain': current_site,
#         'user_id': urlsafe_base64_encode(force_bytes(user_type.user_id)),
#         'token': generate_token.make_token(user_type.user)
#     })
    
#     email = EmailMessage(subject=email_subject, body=email_body,
#         from_email=settings.EMAIL_FROM_USER,
#         to=[user_type.user.email]
#         )

#     email.send()

    
# TO BE USED IN SPRINT 3 EMAIL VERIFICATION
# class ActivateEmailView(generics.GenericAPIView):

#     serializer_class = UserSerializer

#     def get(self, request, *args, **kwargs):
#         token = self.kwargs['token']
#         id = force_str(urlsafe_base64_decode(self.kwargs['user_id']))

#         user = User.objects.get(id=id)

#         if user and generate_token.check_token(user, token):
#             user.is_email_verified = True
#             user.save()

#             return Response(
#                 {
#                     "user": self.get_serializer(
#                         user, context=self.get_serializer_context()
#                     ).data,
#                     "msg": 'Email is verified!'
#                 },
#                 status=status.HTTP_200_OK
#             )
        
#         return render(request, 'email/something_went_wrong.html')

def send_admin_approval_email(admin, position, request):    
    current_site = get_current_site(request)
    email_subject = 'Approve Position Registration Request'
    email_body = render_to_string('email/approve_position_email.html', {
        'admin': str(admin),
        'position': str(position),
        'position_email': str(position.user.email),
        'position_proof': str(position.proof),
        'domain': current_site,
        'user_id': urlsafe_base64_encode(force_bytes(position.user_id)),
        'position_type': 'doctor' if position.user.is_doctor else 'immigration_officer'
    })
    
    email = EmailMessage(subject=email_subject, body=email_body,
        from_email=settings.EMAIL_FROM_USER,
        to=[admin.email]
        )

    email.send()

class ApproveDoctorView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        id = force_str(urlsafe_base64_decode(self.kwargs['user_id']))

        user = User.objects.get(id=id)
        doctor = Doctor.objects.get(user_id=user.id)

        if user and doctor:
            user.is_pending_approval = False
            user.is_active = True
            user.save()

            return Response(
                {
                    "msg": str(doctor)+' is approved!'
                },
                status=status.HTTP_200_OK
            )
        
        return render(request, 'email/something_went_wrong.html')
    
class ApproveImmigrationOfficerView(generics.GenericAPIView):
    
    def get(self, request, *args, **kwargs):
        id = force_str(urlsafe_base64_decode(self.kwargs['user_id']))

        user = User.objects.get(id=id)
        immigrationOfficer = ImmigrationOfficer.objects.get(user_id=user.id)

        if user and immigrationOfficer:
            user.is_pending_approval = False
            user.is_active = True
            user.save()

            return Response(
                {
                    "msg": str(immigrationOfficer)+' is approved!'
                },
                status=status.HTTP_200_OK
            )
        
        return render(request, 'email/something_went_wrong.html')

# Register Doctor View
class RegisterDoctorView(generics.GenericAPIView):
    serializer_class = RegisterDoctorSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        user = doctor.user
        token = AuthToken.objects.create(doctor.user)[1]

        send_admin_approval_email(
            admin=User.objects.filter(is_superuser=True).order_by('?').first(),
            position=doctor,
            request=request
            )

        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # send_verif_email(user_type=doctor, request=request)

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

# Register Immigration Officer View
class RegisterImmigrationOfficerView(generics.GenericAPIView):
    serializer_class = RegisterImmigrationOfficerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        immigrationOfficer = serializer.save()
        user = immigrationOfficer.user
        token = AuthToken.objects.create(immigrationOfficer.user)[1]

        send_admin_approval_email(
            admin=User.objects.filter(is_superuser=True).order_by('?').first(),
            position=immigrationOfficer,
            request=request
            )

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

# Did not want to deal with this case so I made this view without
# email for testing purposes
class RegisterDoctorTestView(generics.GenericAPIView):
    serializer_class = RegisterDoctorTestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        user = doctor.user
        token = AuthToken.objects.create(doctor.user)[1]

        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # send_verif_email(user_type=doctor, request=request)

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

# Regiser Patient View
class RegisterPatientView(generics.GenericAPIView):
    serializer_class = RegisterPatientSerializer

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

# Login Doctor View
class LoginDoctorView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data) 
        doctor = Doctor.objects.get(user_id=user.id)
        token = AuthToken.objects.create(user)[1]
        return Response(
            {
                "user_data": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
            }
        )

# Login Immigration Officer View
class LoginImmigrationOfficerView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data) 
        immigrationOfficer = ImmigrationOfficer.objects.get(user_id=user.id)
        token = AuthToken.objects.create(user)[1]
        return Response(
            {
                "user_data": ImmigrationOfficerSerializer(
                    immigrationOfficer, context=self.get_serializer_context()
                ).data,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
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

# Get Immigration Officer View
class ImmigrationOfficerView(generics.RetrieveAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ImmigrationOfficerSerializer

    def get_object(self):
        return self.request.user.immigrationofficer

# Get Patient View
class PatientView(generics.RetrieveAPIView):
    # only authenticated users can get access
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PatientSerializer

    def get_object(self):
        return self.request.user.patient