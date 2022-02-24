"""Serializers"""

from rest_framework import serializers
from .models import Person, Status
from accounts.models import Patient


class PersonSerializer(serializers.ModelSerializer):
    """Person Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = Person
        fields = "__all__"

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = "__all__"
        extra_kwargs = {'date':{'read_only':True}}