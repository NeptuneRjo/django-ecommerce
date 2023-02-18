from django.urls import path
from .views import registration_view, user_view, add_to_cart, remove_from_cart

from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
    path('register', registration_view, name='register'),
    path('login', obtain_auth_token, name='login'),
    path('user', user_view, name='user'),
    path('add-to-cart', add_to_cart, name='add-to-cart'),
    path('remove-from-cart', remove_from_cart, name='remove-from-cart')
]
