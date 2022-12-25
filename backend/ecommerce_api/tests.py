from decimal import Decimal
from django.test import TestCase
from .models import StoreItem


class StoreItemTestCase(TestCase):
    def setUp(self):
        StoreItem.objects.create(
            item_name='test', item_price=3.99, item_thumb_url='https://example.com')

    def test_item_name_matches(self):
        test = StoreItem.objects.get(item_id=1)
        self.assertEqual(test.item_name, 'test')

    def test_item_price_matches(self):
        test = StoreItem.objects.get(item_id=1)
        self.assertEqual(test.item_price, Decimal('3.99'))

    def test_item_url_matches(self):
        test = StoreItem.objects.get(item_id=1)
        self.assertEqual(test.item_thumb_url, 'https://example.com')

    def test_item_matches_query_name(self):
        test = StoreItem.objects.get(item_id=1)
        self.assertEqual(str(test), 'test')
