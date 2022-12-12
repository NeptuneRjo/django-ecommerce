from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from .models import Account
from django.contrib.auth.models import User
from .serializers import AccountSerializer, RegistrationSerializer


# register user
@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}

        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'successfully registered a new user.'
            data['username'] = account.user.username
        else:
            data = serializer.errors

        return Response(data)
