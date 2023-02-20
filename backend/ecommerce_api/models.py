from django.db import models


class StoreItem(models.Model):
    item_category = models.CharField(max_length=999, default='')
    item_description = models.CharField(max_length=999, default='')
    item_image_url = models.CharField(max_length=999, default='')
    item_price = models.DecimalField(decimal_places=2, max_digits=8, default=0)
    item_rating = models.DecimalField(
        decimal_places=1, max_digits=8, default=0)
    item_count = models.IntegerField(default=0)
    item_title = models.CharField(max_length=999, default='')
    item_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.item_title
