from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, hashers
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    passwordconfirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        passwordconfirmation = data.pop('passwordconfirmation')
        if password != passwordconfirmation:
            raise serializers.ValidationError({ 'passwordconfirmation' : 'Does not match password.' })
        password_validation.validate_password(password)
        data['password'] = hashers.make_password(password)
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profileimage', 'password', 'passwordconfirmation')