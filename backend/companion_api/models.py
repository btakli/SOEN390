"""Create your models (db tables) here"""

from xmlrpc.client import DateTime
from django.db import models
from accounts.models import User, Patient
from datetime import datetime

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

class Status(models.Model):
    STATUS_OPTIONS = [
        ('Healthy', 'Healthy'),
        ('Infected', 'Infected'),
        ('Recovered', 'Recovered')
    ]
    status = models.CharField(
        choices=STATUS_OPTIONS,
        max_length=20,
        default='Healthy'
    )
    soreThroat = models.BooleanField
    runnyNose = models.BooleanField
    sneezing = models.BooleanField
    caugh = models.BooleanField
    diffBreathing = models.BooleanField
    highTemp = models.BooleanField
    fever = models.BooleanField
    chills = models.BooleanField
    fatigue = models.BooleanField
    muscleAche = models.BooleanField
    smellOrTasteLoss = models.BooleanField
    headache = models.BooleanField
    stomachPain = models.BooleanField

    patient = models.ForeignKey(
        Patient, related_name="statuses", on_delete=models.SET_NULL, null=True, blank=True
    )

    date = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return f'{self.status} ({self.patient})'
