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

def send_admin_approval_email(admin, doctor, request):    
    current_site = get_current_site(request)
    email_subject = 'Approve Doctor Registration Request'
    email_body = render_to_string('email/approve_doctor_email.html', {
        'admin': str(admin),
        'doctor': str(doctor),
        'doctor_email': str(doctor.user.email),
        'doctor_proof': str(doctor.proof),
        'domain': current_site,
        'user_id': urlsafe_base64_encode(force_bytes(doctor.user_id))
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

# Regiser Doctor View
class RegisterDoctorView(generics.GenericAPIView):
    serializer_class = RegisterDoctorSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        token = AuthToken.objects.create(doctor.user)[1]

        send_admin_approval_email(
            admin=User.objects.filter(is_superuser=True).order_by('?').first(),
            doctor=doctor,
            request=request
            )

        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # send_verif_email(user_type=doctor, request=request)

        return Response(
            {
                "doctor": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
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
        token = AuthToken.objects.create(doctor.user)[1]

        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # send_verif_email(user_type=doctor, request=request)

        return Response(
            {
                "doctor": DoctorSerializer(
                    doctor, context=self.get_serializer_context()
                ).data,
                "token": token,  # Create token based on user
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