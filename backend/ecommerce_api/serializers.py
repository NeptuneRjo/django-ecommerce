from rest_framework import serializers
from .models import StoreItem


class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = ['item_category',
                  'item_description',
                  'item_image_url',
                  'item_price',
                  'item_rating',
                  'item_count',
                  'item_title']
