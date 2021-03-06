"""Create your models (db tables) here"""

from django.db import models
from accounts.models import User, Patient, Doctor
from django.utils import timezone
from rest_framework import serializers

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
    class Meta:
        verbose_name = "status"
        verbose_name_plural = "statuses"
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
    cough = models.BooleanField(default=False)
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
        Patient, related_name="statuses", on_delete=models.CASCADE, null=True, blank=True
    )

    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.status}'

class Notification(models.Model):
    TYPE_OPTIONS = [
        ('Email', 'Email'),
        ('Assignment', 'Assignment'),
        ('Appointment', 'Appointment'),
        ('InfectedAlert', 'InfectedAlert')
    ]
    type = models.CharField(
        choices=TYPE_OPTIONS,
        max_length=20,
        default='Email'
    )
    subject = models.CharField(max_length=30)
    message = models.TextField(max_length=250)
    user = models.ForeignKey(
        User, related_name="notifications", on_delete=models.CASCADE, blank=True
    )

class Address(models.Model):
    name = models.CharField(max_length=30)
    streetNumber = models.IntegerField()
    streetName = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    province = models.CharField(max_length=30)
    postalCode = models.CharField(max_length=30)
    patient = models.ForeignKey(
        Patient, related_name="addresses", on_delete=models.CASCADE, null=True, blank=True
    )

class Appointment(models.Model):
    patient = models.ForeignKey(
        Patient, related_name="appointments", on_delete=models.CASCADE
    )

    doctor = models.ForeignKey(
        Doctor, related_name="appointments", on_delete=models.CASCADE
    )

    start = models.DateTimeField()
    end = models.DateTimeField(null=True)

    def _validate_start_end_dates(self):
        if self.end < self.start:
            raise serializers.ValidationError("End date cannot be before start date.")

        if (self.end - self.start).days >= 1:
            raise serializers.ValidationError("Availabilities must be less than a day.")

    def save(self, *args, **kwargs):
        self._validate_start_end_dates()
        return super().save(*args, **kwargs)

class Availability(models.Model):
    doctor = models.ForeignKey(
        Doctor, related_name="availabilities", on_delete=models.CASCADE, blank=True
    )

    start = models.DateTimeField()
    end = models.DateTimeField()

    def _validate_start_end_dates(self):
        if self.end < self.start:
            raise serializers.ValidationError("End date cannot be before start date.")

        if (self.end - self.start).days >= 1:
            raise serializers.ValidationError("Availabilities must be less than a day.")

    def save(self, *args, **kwargs):
        self._validate_start_end_dates()
        return super().save(*args, **kwargs)
