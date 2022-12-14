from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from ecommerce_api.models import StoreItem
from .serializers import AccountSerializer, RegistrationSerializer
from .models import Account

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


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated, ])
def user_view(request):

    user = request.user
    account = Account.objects.get(user__username=user.username)

    data = {}

    if request.method == 'PATCH':
        to_add = request.data.get('to_add')
        to_remove = request.data.get('to_remove')

        # Adds items; throws error if item does not exist
        try:
            for item in to_add:
                found_item = StoreItem.objects.get(item_name=item['item_name'])
                account.account_cart.add(found_item)
        except StoreItem.DoesNotExist as e:
            data['to_add_error'] = 'Item(s) do not exist.'

        # Removes items; throws error if item does not exist
        try:
            for item in to_remove:
                found_item = StoreItem.objects.get(item_name=item['item_name'])
                account.account_cart.remove(found_item)
        except StoreItem.DoesNotExist as e:
            data['to_remove_error'] = 'Item(s) do not exist.'

    data['account'] = AccountSerializer(account).data

    return Response(data)
