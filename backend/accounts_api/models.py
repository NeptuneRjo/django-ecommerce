from django.db import models
from django.contrib.auth.models import User
from ecommerce_api.models import StoreItem

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Extends the Django User Model
# Accessed with User.account.fieldname


class Account(models.Model):
    # user = User.objects.get(username='')
    # user_cart = user.account.account_cart

    # Adding StoreItem's to the cart:
    # account.account_cart.add(StoreItem)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_cart = models.ManyToManyField(StoreItem)

    def __str__(self):
        return self.user.username

    # Returns a list of cart items (StoreItem)

    def cart(self):
        cart_list = []

        for item in self.account_cart.all():
            cart_list.append(item)

        return cart_list


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
