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

urlpatterns = [
    path("api/patients/", DoctorPatientView.as_view(), name='doctor_patients'),
    path("api/toggle/priority/<int:pk>/", TogglePriorityView.as_view(), name='toggle_priority'),
    path("api/toggle/isAway/", ToggleAwayView.as_view(), name='toggle_is_away'),
    # path("api/patient/status/latest/", LatestStatusView.as_view(), name='latest_status'), # Dont need this anymore
    path("api/doctor/patient/status/latest/<int:pk>/", SpecificLatestStatusView.as_view(), name='patient_latest_status'), 
    path("api/patients/at-risk/", PatientsWithMatchingAddressView.as_view(), name="patients_risk")
    #path("api/matchingAddress/", PatientsWithMatchingAddressView.as_view(), name='patient_address'), 
]
urlpatterns += router.urls
