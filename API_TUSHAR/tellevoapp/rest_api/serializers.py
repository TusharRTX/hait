from rest_framework import serializers
from rest_framework import serializers
from core.models import Producto
from core.models import Categorias
from core.models import User
from rest_framework import serializers
from core.models import CompraAprobada, CompraProducto

class CompraProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompraProducto
        fields = ['producto', 'cantidad']

class CompraAprobadaSerializer(serializers.ModelSerializer):
    productos = CompraProductoSerializer(many=True)

    class Meta:
        model = CompraAprobada
        fields = ['usuario', 'productos', 'total']

    def create(self, validated_data):
        productos_data = validated_data.pop('productos')
        compra = CompraAprobada.objects.create(**validated_data)
        for producto_data in productos_data:
            CompraProducto.objects.create(compra=compra, **producto_data)
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
