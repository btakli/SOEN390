"""Serializers"""

from rest_framework import serializers
from .models import Person, Status, Notification
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