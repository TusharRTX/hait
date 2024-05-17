from rest_framework import serializers
from core.models import Usuario
from rest_framework import serializers
from core.models import Producto
from core.models import Categorias


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = ['id', 'nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['user','password','nombre','correo','rol']



class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['codigo','categoria', 'marca', 'nombre', 'precio', 'url_imagen']