from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Doctor, ImmigrationOfficer, Patient

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = User
        fields = ("id", "email", "is_doctor", "is_patient", "is_immigration_officer", "password")
        extra_kwargs = {
            "password": {"write_only": True},
            'is_doctor':{'read_only':True},
            'is_immigration_officer':{'read_only':True},
            'is_patient':{'read_only':True}
            }

# Doctor Serializer
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
        
# Immigration Officer Serializer
class ImmigrationOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImmigrationOfficer
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
        fields = "__all__"
        extra_kwargs = {
            'is_away':{'read_only':True}
            }
        
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
        user.is_pending_approval = True
        user.is_active = False # DOCTOR USERS MUST BE APPROVED FIRST
        user.is_email_verified = False
        user.save() # update user change 

        doctor = Doctor.objects.create(
            user = user,
            **validated_data
        )

        return doctor

# Did not want to deal with this case so I made this ser without
# email verif for testing purposes
class RegisterDoctorTestSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()    

    class Meta:
        """Requires Meta attribute"""

        model = Doctor
        fields = "__all__"
        
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
        user.is_email_verified = False
        user.save() # update user change 

        doctor = Doctor.objects.create(
            user = user,
            **validated_data
        )

        return doctor
    
# Register Immigration Officer Serializer
class RegisterImmigrationOfficerSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    user = UserSerializer()    

    class Meta:
        """Requires Meta attribute"""

        model = ImmigrationOfficer
        fields = "__all__"
        
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
        user.is_immigration_officer = True
        user.is_pending_approval = True
        user.is_active = False
        user.is_email_verified = False
        user.save() # update user change 

        doctor = ImmigrationOfficer.objects.create(
            user = user,
            **validated_data
        )

        return doctor

# Register Patient Serializer
class RegisterPatientSerializer(serializers.ModelSerializer):
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
        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # user.is_pending = True
        # user.is_active = False # DOCTOR USERS MUST BE APPROVED FIRST
        # user.is_email_verified = False

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

        # TO BE USED IN SPRINT 3 EMAIL VERIFICATION
        # if not user.is_email_verified:
        #     raise serializers.ValidationError("Email is not verified, please check your inbox")

        if user:
            if user.is_active:
                return user
            else:
                raise serializers.ValidationError("User is not Active!")
        
        # Display this as error response if bad login
        raise serializers.ValidationError("Invalid Credentials")