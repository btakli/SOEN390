from rest_framework import serializers
from .models import User, Doctor, ImmigrationOfficer
from .serializers import *

# Did not want to deal with this case so I made this ser without
# email verif for testing purposes
class RegisterDoctorTestSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()    

    class Meta:
        """Requires Meta attribute"""

        model = Doctor
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            user_data['email'],
            user_data['password']
        )
        user.is_doctor = True
        user.is_email_verified = True
        user.save() # update user change 

        doctor = Doctor.objects.create(
            user = user,
            **validated_data
        )

        return doctor

# Register Immigration Officer Serializer
class RegisterImmigrationOfficerTestSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()    

    class Meta:
        """Requires Meta attribute"""

        model = ImmigrationOfficer
        fields = "__all__"
        
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            user_data['email'],
            user_data['password']
        )
        user.is_immigration_officer = True
        user.is_email_verified = True
        user.save() # update user change  

        doctor = ImmigrationOfficer.objects.create(
            user = user,
            **validated_data
        )

        return doctor

# Register Patient Serializer
class RegisterPatientTestSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()

    class Meta:
        """Requires Meta attribute"""

        model = Patient
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            user_data['email'],
            user_data['password']
        )
        user.is_patient = True
        user.is_email_verified = True
        user.save() # update user change 

        patient = Patient.objects.create(
            user = user,
            **validated_data
        )

        return patient