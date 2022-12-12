from rest_framework.response import Response
from rest_framework import status, permissions
from .models import StoreItem
from .serializers import StoreItemSerializer
from rest_framework.decorators import api_view


# Retrieve items
@api_view(['GET', ])
def get_items(request):
    store_items = StoreItem.objects.all()
    serializer = StoreItemSerializer(store_items, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


# Possible need for the ability to manipulate the items outside of the database?
# Maybe post request...?
