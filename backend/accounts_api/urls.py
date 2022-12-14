from django.urls import path
from .views import registration_view, user_view

from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
    path('register', registration_view, name='register'),
    path('login', obtain_auth_token, name='login'),
    path('user', user_view, name='user'),
]
