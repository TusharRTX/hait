# Generated by Django 5.0.6 on 2024-07-07 21:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_create_pedidofinal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('voucher_id', models.AutoField(primary_key=True, serialize=False)),
                ('items', models.JSONField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]