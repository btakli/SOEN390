"""Router registration"""

from rest_framework.routers import DefaultRouter
from .models import *
from .views import *

app_name = "companion_api"

router = DefaultRouter()
router.register(r"api/person", PersonView, basename="person")

urlpatterns = router.urls
