from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

# Very generic Person table... 
# See https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.Field for different fields
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_of_birth = models.DateField()
