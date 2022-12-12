from .models import Account
from rest_framework import serializers
from django.contrib.auth.models import User


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user', 'account_cart']


class RegistrationSerializer(serializers.ModelSerializer):

    # Add password2 (confirmation) as an additional field
    # write only; encrypt
    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    # define Meta; set password to write only
    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(username=self.validated_data['username'])

        # data becomes available after is_valid() is run
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'}
            )

        # create a new user and save
        user.set_password(password)
        user.save()

        # # create a new account, pass user and save
        # account = Account(user=user)
        # account.save()

        return user
