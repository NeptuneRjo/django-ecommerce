from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.authtoken.models import Token
from rest_framework import status

from ecommerce_api.models import StoreItem
from .serializers import AccountSerializer, RegistrationSerializer
from .models import Account


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def get_user(request):

    user = request.user
    data = {}

    try:
        account = Account.objects.get(user__username=user.username)
        data['account'] = AccountSerializer(account).data
    except Account.DoesNotExist:
        data['error'] = 'No Account found'
    except Exception as err:
        data['error'] = str(err)

    if 'error' in data:
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data)


@api_view(['POST', ])
@permission_classes([BasePermission, ])
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
            data['error'] = serializer.errors

        return Response(data)


@api_view(['PATCH', ])
@permission_classes([IsAuthenticated, ])
def add_to_cart(request):
    user = request.user
    account = Account.objects.get(user=user)

    data = {}

    if request.method == 'PATCH':
        try:
            item = request.data['item']
            item_to_add = StoreItem.objects.get(
                item_title=item.get('item_title'))
            account.account_cart.add(item_to_add)

        except StoreItem.DoesNotExist as error:
            data['error'] = 'Item does not exist'
        except Exception as error:
            data['error'] = 'An error has occured'
            print(str(error))

        if 'error' in data:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data['account'] = AccountSerializer(account).data
            return Response(data, status=status.HTTP_200_OK)


@api_view(['PATCH', ])
@permission_classes([IsAuthenticated, ])
def remove_from_cart(request):
    user = request.user
    account = Account.objects.get(user=user)

    data = {}

    if request.method == 'PATCH':
        try:
            item = request.data['item']
            item_to_remove = StoreItem.objects.get(
                item_title=item.get('item_title'))
            account.account_cart.remove(item_to_remove)

        except StoreItem.DoesNotExist as error:
            data['error'] = 'Item does not exist'
        except Exception as err:
            data['error'] = str(err)

        if 'error' in data:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data['account'] = AccountSerializer(account).data
            return Response(data, status=status.HTTP_200_OK)
