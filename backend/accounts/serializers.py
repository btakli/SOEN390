from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    '''User Serializer'''
    class Meta:
        '''Requires Meta attribute'''
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    '''Register Serializer'''
    class Meta:
        '''Requires Meta attribute'''
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    '''Login Serializer'''
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        # Display this as error response if bad login
        raise serializers.ValidationError("Invalid Credentials")
        