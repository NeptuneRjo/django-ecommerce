# Generated by Django 4.1.3 on 2023-02-05 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RatingDicty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ('count', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='storeitem',
            name='item_name',
        ),
        migrations.RemoveField(
            model_name='storeitem',
            name='item_thumb_url',
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_category',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_description',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_image_url',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_rating',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='storeitem',
            name='item_title',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AlterField(
            model_name='storeitem',
            name='item_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
    ]
