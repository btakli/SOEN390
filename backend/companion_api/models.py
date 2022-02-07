'''Create your models (db tables) here'''

from django.db import models
from django.contrib.auth.models import User

# from django.contrib.auth.models import User
# from django.utils import timezone


class Person(models.Model):
    '''Very generic Person table
    For possible fields see:
    https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.Field'''

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_of_birth = models.DateField()
    owner = models.ForeignKey(User, related_name='patients', on_delete=models.CASCADE, null=True)
