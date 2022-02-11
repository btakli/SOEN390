from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    class Meta:
        """Requires Meta attribute"""

        model = User
        fields = ("id", "username", "email")
        # out of all the default user attributes we are only showing these three


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    """Register Serializer"""

    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    class Meta:
        """Requires Meta attribute"""

        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )

        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    """Login Serializer"""

    username = serializers.CharField()
    password = serializers.CharField()

    # This is where the login auth happens in the whole app!
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        # Display this as error response if bad login
        raise serializers.ValidationError("Invalid Credentials")
