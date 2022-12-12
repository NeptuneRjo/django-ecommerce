from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import StoreItem
from .serializers import StoreItemSerializer


# Retrieve items
def get_items(self, request, *args, **kwargs):
    store_items = StoreItem.objects.all()
    serializer = StoreItemSerializer(store_items, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


# Possible need for the ability to manipulate the items outside of the database?
# Maybe post request...?
