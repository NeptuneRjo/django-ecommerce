from django.test import TestCase
from .models import Account
from ecommerce_api.models import StoreItem
from django.contrib.auth.models import User

from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework.authtoken.models import Token


class AccountTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(
            username='testUser',
            password='testpassword'
        )
        Account.objects.create(user=user)
        StoreItem.objects.create(
            item_name='test',
            item_price=3.99,
            item_thumb_url='https://example.com'
        )

    def test_account_name_matches(self):
        test = Account.objects.get(id=1)
        self.assertEqual(test.user.username, 'testUser')

    def test_account_cart_matches(self):
        test = Account.objects.get(id=1)
        item = StoreItem.objects.get(item_id=1)

        test.account_cart.add(item)
        cart = test.account_cart.get(item_id=1)

        self.assertEqual(cart, item)

    def test_account_shows_name_query(self):
        test = Account.objects.get(id=1)
        self.assertEqual(str(test.user.username), 'testUser')

    def test_account_cart_method(self):
        test = Account.objects.get(id=1)
        item = StoreItem.objects.get(item_id=1)

        test.account_cart.add(item)
        cart = test.cart()

        self.assertEqual(cart, [item])


class AccountApiTests(APITestCase):
    def setUp(self):
        user = User.objects.create(
            username='test',
            password='testpassword'
        )
        Account.objects.create(user=user)
        StoreItem.objects.create(
            item_name='test',
            item_price=3.99,
            item_thumb_url='https://example.com'
        )

    def test_register_user(self):
        url = reverse('accounts:register')
        data = {
            'username': 'test',
            'password': 'testpassword',
            'password2': 'testpassword'
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.get(id=1).user.username, 'test')

    def test_get_user_cart(self):
        url = reverse('accounts:user')
        client = APIClient()

        user = User.objects.get(id=1)

        # Queries by account, so the account MUST be made.
        token = Token.objects.get(user=user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        response = client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_patch_user_cart_add(self):
        url = reverse('accounts:user')
        client = APIClient()

        user = User.objects.get(id=1)
        item = StoreItem.objects.get(item_id=1)

        # Queries by account, so the account MUST be made.
        token = Token.objects.get(user=user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            'to_add': [{
                'item_name': item.item_name,
                'item_price': item.item_price,
                'item_thumb_url': item.item_thumb_url,
            }],
            'to_remove': [],
        }

        response = client.patch(url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_patch_user_cart_remove(self):
        url = reverse('accounts:user')
        client = APIClient()

        user = User.objects.get(id=1)
        item = StoreItem.objects.get(item_id=1)

        # Queries by account, so the account MUST be made.
        token = Token.objects.get(user=user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            'to_remove': [{
                'item_name': item.item_name,
                'item_price': item.item_price,
                'item_thumb_url': item.item_thumb_url,
            }],
            'to_add': [],
        }

        response = client.patch(url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_patch_user_cart_errors(self):
        url = reverse('accounts:user')
        client = APIClient()

        user = User.objects.get(id=1)

        # Queries by account, so the account MUST be made.
        token = Token.objects.get(user=user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        data = {
            'to_add': [{
                'item_name': 'error',
                'item_price': 'error',
                'item_thumb_url': 'error',
            }],
            'to_remove': [{
                'item_name': 'error',
                'item_price': 'error',
                'item_thumb_url': 'error',
            }],
        }

        response = client.patch(url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['to_add_error'], 'Item(s) do not exist.')
        self.assertEqual(
            response.data['to_remove_error'], 'Item(s) do not exist.')
