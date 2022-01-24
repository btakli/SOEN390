from rest_framework import serializers
from companion_api.models import *

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'