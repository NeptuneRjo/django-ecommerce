from django.test import TestCase
from .models import Account
from ecommerce_api.models import StoreItem
from django.contrib.auth.models import User


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
