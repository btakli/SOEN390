"""Register API"""

from django.apps import AppConfig


class CompanionApiConfig(AppConfig):
    """Setup for API"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "companion_api"
