"""Router registration"""

from rest_framework.routers import DefaultRouter
from .models import *
from .views import *
from django.urls import path

app_name = "companion_api"

router = DefaultRouter()
router.register(r"api/person", PersonView, basename="person")
router.register(r"api/patient/status", PatientStatusView, basename="status")
router.register(r"api/notification", NotificationView, basename="notification")
router.register(r"api/address", AddressView, basename="address")
router.register(r"api/appointment", AppointmentView, basename="appointment")
router.register(r"api/availability", AvailabilityView, basename="availability")

urlpatterns = [
    path("api/patients/", DoctorPatientView.as_view(), name='doctor_patients'),
    path("api/doctor/", PatientDoctorView.as_view(), name='patient_doctor'),
    path("api/immigrants/", OfficerImmigrantView.as_view(), name='officer_immigrants'),

    path("api/toggle/priority/<int:pk>/", TogglePriorityView.as_view(), name='toggle_priority'),
    path("api/toggle/is-away/", ToggleAwayView.as_view(), name='toggle_is_away'),

    path("api/doctor/patient/status/latest/<int:pk>/", SpecificLatestStatusView.as_view(), name='patient_latest_status'), 

    # Too annoying to test for now (if there is time do this)
    path("api/patients/at-risk/", PatientsWithMatchingAddressView.as_view(), name="patients_risk"),
    path("api/reassign/", ReassignPatientsToTempDoctorView.as_view(), name="reassign_patients")
]

urlpatterns += router.urls
