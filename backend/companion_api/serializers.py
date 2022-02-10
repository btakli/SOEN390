"""Serializers"""

from rest_framework import serializers
from companion_api.models import Person


class PersonSerializer(serializers.ModelSerializer):
    """Person Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = Person
        fields = "__all__"
