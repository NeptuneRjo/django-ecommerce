from django.db import models

# Create your models here.


# class StoreItem(models.Model):
#     item_name = models.CharField(max_length=220)
#     item_price = models.DecimalField(max_digits=8, decimal_places=2)
#     item_thumb_url = models.CharField(max_length=180)
# item_id = models.AutoField(primary_key=True)

#     def __str__(self):
#         return self.item_name


class StoreItem(models.Model):
    item_category = models.CharField(max_length=999, default='')
    item_description = models.CharField(max_length=999, default='')
    item_image_url = models.CharField(max_length=999, default='')
    item_price = models.DecimalField(decimal_places=4, max_digits=8, default=0)
    item_rating = models.DecimalField(
        decimal_places=4, max_digits=8, default=0)
    item_count = models.IntegerField(default=0)
    item_title = models.CharField(max_length=999, default='')
    item_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.item_title
