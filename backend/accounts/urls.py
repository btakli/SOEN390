"""Router registration"""

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from knox import views as knox_views
from .views import *

app_name = "accounts"

router = DefaultRouter()
router.register(r"api/patients", DoctorPatientsView, basename="patients_of_doctor")

urlpatterns = [
    path("api/auth", include("knox.urls")),
    path("api/auth/register/doctor", RegisterDoctorView.as_view(), name='register_doctor'),
    path("api/auth/register/patient", RegisterPatientView.as_view(), name='register_patient'),
    path("api/auth/login/doctor", LoginDoctorView.as_view(), name='login_doctor'),
    path("api/auth/login/patient", LoginPatientView.as_view(), name='login_patient'),
    path("api/auth/users/doctor", DoctorView.as_view(), name='users_doctor'),
    path("api/auth/users/patient", PatientView.as_view(), name='users_patient'),
    path("api/auth/user", UserView.as_view(), name='user'),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("api/approve-doctor/<user_id>", ApproveDoctorView.as_view(), name='approve_doctor'),
    # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
    # path("api/activate-email/<user_id>/<token>", ActivateEmailView.as_view(), name='activate_email'),
]

urlpatterns += router.urls
