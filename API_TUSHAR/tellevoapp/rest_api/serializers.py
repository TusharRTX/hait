from rest_framework import serializers
from rest_framework import serializers
from core.models import Producto
from core.models import Categorias
from core.models import User, PedidoFinal
from core.models import Voucher
from rest_framework import serializers
from core.models import CompraAprobada, CompraProducto, DetallePedido, EstadoPedido, PedidoFinal
from rest_framework import serializers
from core.models import Producto, Categorias, User, CompraAprobada, CompraProducto, DetallePedido, EstadoPedido, PedidoFinal

# Serializer para la creación de CompraAprobada
class CompraAprobadaCreateSerializer(serializers.ModelSerializer):
    productos_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    cantidades = serializers.ListField(child=serializers.IntegerField(), write_only=True)  # Añadimos la lista de cantidades

    class Meta:
        model = CompraAprobada
        fields = ['usuario', 'productos_ids', 'cantidades', 'total', 'delivery_method']

    def create(self, validated_data):
        productos_ids = validated_data.pop('productos_ids')
        cantidades = validated_data.pop('cantidades')
        compra = CompraAprobada.objects.create(**validated_data)
        for producto_id, cantidad in zip(productos_ids, cantidades):
            producto = Producto.objects.get(id=producto_id)
            CompraProducto.objects.create(compra=compra, producto=producto, cantidad=cantidad)
        return compra


# Serializer para obtener los detalles completos de CompraAprobada
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'nombre', 'apellido', 'correo', 'direccion', 'rut', 'telefono', 'rol']
        extra_kwargs = {
            'password': {'write_only': True}
            # 'rol': {'read_only': True}
        }

    def create(self, validated_data):
        validated_data['rol'] = 'comprador'  # Asigna el rol "comprador" por defecto
        user = User.objects.create_user(**validated_data)
        return user
    
class CompraProductoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()

    class Meta:
        model = CompraProducto
        fields = ['producto', 'cantidad']

class CompraAprobadaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()
    productos = CompraProductoSerializer(many=True, source='compraproducto_set')

    class Meta:
        model = CompraAprobada
        fields = ['id', 'usuario', 'total', 'delivery_method', 'productos']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = ['id', 'nombre']


from core.models import DetallePedido, EstadoPedido


class DetallePedidoSerializer(serializers.ModelSerializer):
    estado_bodeguero = serializers.CharField(source='estadopedido.estado', read_only=True, default="No definido")
    nota_bodeguero = serializers.CharField(source='estadopedido.nota_bodeguero', read_only=True, default="No definido")

    class Meta:
        model = DetallePedido
        fields = '__all__'

class PedidoFinalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoFinal
        fields = '__all__'        

class EstadoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedido
        fields = '__all__'


from core.models import Voucher, VoucherEnviado

class VoucherEnviadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherEnviado
        fields = '__all__'

class VoucherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    enviado_info = VoucherEnviadoSerializer(source='voucherenviado', read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'







# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', 'nombre', 'apellido', 'correo', 'direccion', 'rut', 'telefono', 'rol']
#         extra_kwargs = {'password': {'write_only': True}, 'rol': {'read_only': True}}

#     def create(self, validated_data):
#         validated_data['rol'] = 'comprador'  # Asigna el rol "comprador" por defecto
#         user = User.objects.create_user(**validated_data)
#         return user

