# Generated by Django 5.0.6 on 2024-06-29 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_detallepedido'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallepedido',
            name='id_compraaprobada',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.compraaprobada'),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='pedido_delivery_method',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='pedido_estado',
            field=models.CharField(choices=[('aprobado', 'Aprobado'), ('rechazado', 'Rechazado')], max_length=10),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_apellido',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_correo',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_nombre',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_rut',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_telefono',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='usuario_username',
            field=models.CharField(max_length=255),
        ),
    ]