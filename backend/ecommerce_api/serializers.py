from rest_framework import serializers
from .models import StoreItem


class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = ['item_name', 'item_price', 'item_thumb_url']
