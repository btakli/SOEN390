"""Serializers"""

from rest_framework import serializers
from .models import *
from accounts.models import Patient


class PersonSerializer(serializers.ModelSerializer):
    """Person Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = Person
        fields = "__all__"

class StatusSerializer(serializers.ModelSerializer):
    """Status Serializer"""

    class Meta:
        """Requires Meta attribute"""
        
        model = Status
        fields = "__all__"
        extra_kwargs = {'date':{'read_only':True}}
        
class NotificationSerializer(serializers.ModelSerializer):
    """Notification Serializer"""

    class Meta:
        """Requires Meta attribute"""
        
        model = Notification
        fields = "__all__"
        extra_kwargs = {'date':{'read_only':True}}

class AddressSerializer(serializers.ModelSerializer):
    """Address Serializer"""

    class Meta:
        """Requires Meta attribute"""
        
        model = Address
        fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):
    """Appointment Serializer"""

    class Meta:
        """Requires Meta attribute"""
        
        model = Appointment
        fields = "__all__"

class AvailabilitySerializer(serializers.ModelSerializer):
    """Availability Serializer"""

    class Meta:
        """Requires Meta attribute"""
        
        model = Availability
        fields = "__all__"
        extra_kwargs = {'doctor':{'read_only':True}}