# Generated by Django 5.0.6 on 2024-06-24 00:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_rename_stock_online_producto_stock_onlines_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='stock_onlines',
            new_name='stock_online',
        ),
        migrations.RenameField(
            model_name='producto',
            old_name='stock_tiendas',
            new_name='stock_tienda',
        ),
    ]
