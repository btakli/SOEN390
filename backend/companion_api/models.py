"""Create your models (db tables) here"""

from django.db import models
from accounts.models import User

# from django.contrib.auth.models import User
# from django.utils import timezone

# Keep this for now as a Generic Model for future reference
class Person(models.Model):
    """Very generic Person table
    For possible fields see:
    https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.Field"""

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_of_birth = models.DateField()
    owner = models.ForeignKey(
        User, related_name="items", on_delete=models.CASCADE, null=True
    )
