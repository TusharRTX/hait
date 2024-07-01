# core/migrations/0002_create_pedidofinal.py

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PedidoFinal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario_username', models.CharField(max_length=255)),
                ('usuario_nombre', models.CharField(max_length=255)),
                ('usuario_apellido', models.CharField(max_length=255)),
                ('usuario_correo', models.CharField(max_length=255)),
                ('usuario_telefono', models.CharField(max_length=255)),
                ('usuario_direccion', models.CharField(max_length=255)),
                ('usuario_rut', models.CharField(max_length=255)),
                ('pedido_total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pedido_delivery_method', models.CharField(max_length=255)),
                ('pedido_estado', models.CharField(max_length=255)),
                ('productos', models.TextField()),
                ('nota_bodeguero', models.TextField(blank=True, null=True)),
                ('estado_bodeguero', models.CharField(blank=True, max_length=255, null=True)),
                ('enviada_a_vendedor', models.BooleanField(default=False)),
            ],
        ),
    ]
