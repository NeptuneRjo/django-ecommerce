# Generated by Django 4.1.3 on 2023-02-10 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_api', '0006_alter_storeitem_item_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeitem',
            name='item_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='storeitem',
            name='item_rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=8),
        ),
    ]