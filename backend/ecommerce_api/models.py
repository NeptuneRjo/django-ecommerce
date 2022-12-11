from django.db import models

# Create your models here.


class StoreItem(models.Model):
    item_name = models.CharField(max_length=220)
    item_price = models.DecimalField(max_digits=8, decimal_places=2)
    item_thumb_url = models.CharField(max_length=180)
    item_id = models.AutoField(primary_key=True)

    def __self__(self):
        return self.item_name
