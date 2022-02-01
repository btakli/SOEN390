'''Router registration'''

from rest_framework.routers import DefaultRouter
from companion_api.models import *
from companion_api.views import *

app_name = 'companion_api'

router = DefaultRouter()
router.register(r'person', PersonView, basename='person')

urlpatterns = router.urls
