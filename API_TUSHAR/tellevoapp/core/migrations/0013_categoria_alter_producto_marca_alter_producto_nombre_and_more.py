# Generated by Django 5.0.6 on 2024-05-17 22:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_producto_delete_productos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='producto',
            name='marca',
            field=models.CharField(max_length=50, verbose_name='Hora de inicio del Viaje'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='nombre',
            field=models.CharField(max_length=50, verbose_name='nombre'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='categoria',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='core.categoria', verbose_name='categoria'),
        ),
    ]
