"""Create your models (db tables) here"""

from django.db import models
from accounts.models import User, Patient
from django.utils import timezone

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
    soreThroat = models.BooleanField(default=False)
    runnyNose = models.BooleanField(default=False)
    sneezing = models.BooleanField(default=False)
    caugh = models.BooleanField(default=False)
    diffBreathing = models.BooleanField(default=False)
    highTemp = models.BooleanField(default=False)
    fever = models.BooleanField(default=False)
    chills = models.BooleanField(default=False)
    fatigue = models.BooleanField(default=False)
    muscleAche = models.BooleanField(default=False)
    smellOrTasteLoss = models.BooleanField(default=False)
    headache = models.BooleanField(default=False)
    stomachPain = models.BooleanField(default=False)

    patient = models.ForeignKey(
        Patient, related_name="statuses", on_delete=models.SET_NULL, null=True, blank=True
    )

    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.status}'
