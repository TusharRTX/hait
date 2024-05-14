from rest_framework import serializers
from core.models import Usuario
# from core.models import Viaje
from core.models import Product, Category

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['user','password','nombre','correo','rol']

# class ViajeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Viaje
#         fields = ['patente','hora','costo','capacidad','destino','duenno','url_imagen','correo']      

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category']

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(**category_data)
        validated_data['category'] = category
        return Product.objects.create(**validated_data)