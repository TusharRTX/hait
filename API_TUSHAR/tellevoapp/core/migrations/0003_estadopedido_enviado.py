# Generated by Django 5.0.6 on 2024-07-01 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_pedidofinal_estado_bodeguero'),
    ]

    operations = [
        migrations.AddField(
            model_name='estadopedido',
            name='enviado',
            field=models.BooleanField(default=False),
        ),
    ]
