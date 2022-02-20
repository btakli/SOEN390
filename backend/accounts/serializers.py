from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Doctor, Patient

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = User
        fields = ("id", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

# Doctor Serializer
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

# Patient Serializer
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

# Register Doctor Serializer
class RegisterDoctorSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()    

    class Meta:
        """Requires Meta attribute"""

        model = Doctor
        fields = ('first_name', 'user')
        
    # only real reason this is needed is cause we need to know for sure
    # that the user data is a user and not some random dict of data.
    # this would not need to be here if we were directly passing user objects
    # to the serializer in the view (we are just using json instead)
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            user_data['email'],
            user_data['password']
        )
        user.is_doctor = True
        user.save() # update user change 

        doctor = Doctor.objects.create(
            user = user,
            **validated_data
        )

        return doctor

# Register Patient Serializer
class RegisterPatientSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()   
    # doctor = DoctorSerializer() 

    class Meta:
        """Requires Meta attribute"""

        model = Patient
        fields = ('first_name', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(
            user_data['email'],
            user_data['password']
        )
        user.is_patient = True
        user.save() # update user change 

        patient = Patient.objects.create(
            user = user,
            **validated_data
        )

        return patient

# Generic Login Serializer 
# SHOULD NOT BE MODEL SERIALIZER --> Not creating models, just validating!
class LoginSerializer(serializers.Serializer):
    """Login Serializer"""

    email = serializers.CharField()
    password = serializers.CharField()

    # This is where the login auth happens in the whole app!
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        # Display this as error response if bad login
        raise serializers.ValidationError("Invalid Credentials")