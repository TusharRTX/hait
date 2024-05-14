from rest_framework import serializers
from core.models import Usuario
from core.models import Viaje

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['user','password','nombre','correo','rol']

class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = ['patente','hora','costo','capacidad','destino','duenno','url_imagen','correo']      
