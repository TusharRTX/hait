from rest_framework import serializers
from core.models import Usuario
from rest_framework import serializers
from core.models import Producto

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['user','password','nombre','correo','rol']



class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['codigo','categoria', 'marca', 'nombre', 'precio', 'url_imagen']