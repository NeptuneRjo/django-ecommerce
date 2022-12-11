from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from ecommerce_api.models import StoreItem

# Extends the Django User Model
# Accessed with User.account.fieldname


class Account(models.Model):
    # user = User.objects.get(username='')
    # user_cart = user.account.account_cart

    # Adding StoreItem's to the cart:
    # account.account_cart.add(StoreItem)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_cart = models.ManyToManyField(StoreItem)
