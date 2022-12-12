from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from .models import Account
from django.contrib.auth.models import User
from .serializers import AccountSerializer, RegistrationSerializer
from django.contrib.auth import login, logout
from rest_framework.authtoken.models import Token


# register user


@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}

        if serializer.is_valid():
            user = serializer.save()

            account = Account(user=user)
            account.save()

            data['response'] = 'successfully registered a new user.'
            data['username'] = account.user.username

            # Must be a User object
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer.errors

        return Response(data)
