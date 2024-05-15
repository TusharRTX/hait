# Generated by Django 5.0 on 2024-05-15 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_delete_viaje'),
    ]

    operations = [
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=10, verbose_name='patente')),
                ('marca', models.CharField(max_length=10, verbose_name='Hora de inicio del Viaje')),
                ('nombre', models.IntegerField(verbose_name='Costo del Viaje')),
                ('precio', models.IntegerField(verbose_name='Capacidad de Pasajeros')),
                ('url_imagen', models.URLField(max_length=500, verbose_name='url_imagen')),
            ],
        ),
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]