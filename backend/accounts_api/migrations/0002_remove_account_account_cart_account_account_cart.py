# Generated by Django 4.1.3 on 2022-12-11 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_api', '0001_initial'),
        ('accounts_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='account_cart',
        ),
        migrations.AddField(
            model_name='account',
            name='account_cart',
            field=models.ManyToManyField(to='ecommerce_api.storeitem'),
        ),
    ]
