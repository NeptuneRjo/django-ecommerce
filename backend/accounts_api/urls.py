from django.urls import path
from .views import registration_view, cart_view

from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
    path('register', registration_view, name='register'),
    path('login', obtain_auth_token, name='login'),
    path('cart', cart_view, name='cart'),
]
