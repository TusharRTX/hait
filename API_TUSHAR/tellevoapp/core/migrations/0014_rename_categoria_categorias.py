# Generated by Django 5.0.6 on 2024-05-17 22:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_categoria_alter_producto_marca_alter_producto_nombre_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Categoria',
            new_name='Categorias',
        ),
    ]
