from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROL_CHOICES = [
        ('comprador', 'Comprador'),
        ('vendedor', 'Vendedor'),
        ('bodeguero', 'Bodeguero'),
        ('contador', 'Contador')
    ]
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    correo = models.EmailField(unique=True)
    direccion = models.CharField(max_length=255)
    rut = models.CharField(max_length=12, unique=True)
    telefono = models.CharField(max_length=15)
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='comprador')

    def __str__(self):
        return self.username

class Categorias(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    codigo = models.CharField(max_length=10)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE, related_name="productos")
    marca = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)
    stock_online = models.IntegerField(default=0)
    stock_tienda = models.IntegerField(default=0)

    def __str__(self):
        return self.codigo

class CompraAprobada(models.Model):
    usuario = models.ForeignKey('User', on_delete=models.CASCADE, related_name='compras', null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_method = models.CharField(max_length=20, choices=[('retiro', 'Retiro en Tienda'), ('despacho', 'Despacho a Domicilio')],default='retiro')

    def __str__(self):
        return f'Compra {self.id} por {self.usuario.username if self.usuario else "Invitado"}'

class CompraProducto(models.Model):
    compra = models.ForeignKey('CompraAprobada', on_delete=models.CASCADE)
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def __str__(self):
        return f'{self.cantidad} de {self.producto.nombre} en compra {self.compra.id}'


from core.models import CompraAprobada

class DetallePedido(models.Model):
    ESTADO_CHOICES = [
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado')
    ]

    id_compraaprobada = models.ForeignKey(CompraAprobada, on_delete=models.CASCADE)
    usuario_username = models.CharField(max_length=255)
    usuario_nombre = models.CharField(max_length=255)
    usuario_apellido = models.CharField(max_length=255)
    usuario_correo = models.CharField(max_length=255)
    usuario_telefono = models.CharField(max_length=255)
    usuario_direccion = models.CharField(max_length=255)
    usuario_rut = models.CharField(max_length=255)
    pedido_total = models.DecimalField(max_digits=10, decimal_places=2)
    pedido_delivery_method = models.CharField(max_length=255)
    pedido_estado = models.CharField(max_length=10, choices=ESTADO_CHOICES)
    productos = models.TextField()  # Aquí guardaremos una representación JSON de los productos

    def __str__(self):
        return f"{self.id_compraaprobada.id} - {self.pedido_estado}"
    

    
from core.models import DetallePedido

class EstadoPedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('preparado', 'Preparado'),
        ('despachado', 'Despachado'),
        ('listo_retiro', 'Listo para Retiro'),
    ]

    id_detallepedido = models.OneToOneField(DetallePedido, on_delete=models.CASCADE)
    estado = models.CharField(max_length=16, choices=ESTADO_CHOICES, default='pendiente')
    nota_bodeguero = models.TextField(blank=True, null=True)
    enviado = models.BooleanField(default=False) 

    def __str__(self):
        return f'{self.id_detallepedido.id} - {self.estado}' 
    
from django.db import models

class PedidoFinal(models.Model):
    usuario_username = models.CharField(max_length=255)
    usuario_nombre = models.CharField(max_length=255)
    usuario_apellido = models.CharField(max_length=255)
    usuario_correo = models.CharField(max_length=255)
    usuario_telefono = models.CharField(max_length=255)
    usuario_direccion = models.CharField(max_length=255)
    usuario_rut = models.CharField(max_length=255)
    pedido_total = models.DecimalField(max_digits=10, decimal_places=2)
    pedido_delivery_method = models.CharField(max_length=255)
    pedido_estado = models.CharField(max_length=255)
    productos = models.TextField()  # Aquí guardaremos una representación JSON de los productos
    nota_bodeguero = models.TextField(blank=True, null=True)
    estado_bodeguero = models.CharField(max_length=255, blank=True, null=True)
    enviada_a_vendedor = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.usuario_username} - {self.pedido_estado}'



from core.models import User


class Voucher(models.Model):
    voucher_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.JSONField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Voucher {self.voucher_id} for {self.user.username}"


from core.models import Voucher

class VoucherEnviado(models.Model):
    voucher = models.OneToOneField(Voucher, on_delete=models.CASCADE, primary_key=True)
    enviado = models.BooleanField(default=False)
    enviado_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Voucher {self.voucher.voucher_id} enviado: {self.enviado}"