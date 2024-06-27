from rest_framework import serializers
from rest_framework import serializers
from core.models import Producto
from core.models import Categorias
from core.models import User
from rest_framework import serializers
from core.models import CompraAprobada, CompraProducto

class CompraAprobadaSerializer(serializers.ModelSerializer):
    productos_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = CompraAprobada
        fields = ['usuario', 'productos_ids', 'total']

    def create(self, validated_data):
        productos_ids = validated_data.pop('productos_ids')
        compra = CompraAprobada.objects.create(**validated_data)
        for producto_id in productos_ids:
            producto = Producto.objects.get(id=producto_id)
            CompraProducto.objects.create(compra=compra, producto=producto, cantidad=1)
        return compra


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'nombre', 'apellido', 'correo', 'direccion', 'rut', 'telefono', 'rol']
        extra_kwargs = {'password': {'write_only': True}, 'rol': {'read_only': True}}

    def create(self, validated_data):
        validated_data['rol'] = 'comprador'  # Asigna el rol "comprador" por defecto
        user = User.objects.create_user(**validated_data)
        return user


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = ['id', 'nombre']



class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
