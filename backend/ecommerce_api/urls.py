from django.urls import path
from . import views

app_name = 'ecommerce'

urlpatterns = [
    path('items', views.get_items, 'items')
]
