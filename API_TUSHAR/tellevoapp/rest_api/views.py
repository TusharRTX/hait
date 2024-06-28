from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate, models as auth_models
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import requests
import mercadopago
import os
from core.models import Producto, Categorias, User
from .serializers import CategoriaSerializer, ProductoSerializer, UserSerializer
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from core.models import CompraAprobada
from .serializers import CompraAprobadaSerializer


@api_view(['GET'])
def productos_disponibles(request):
    productos = Producto.objects.filter(categoria__in=[1, 2, 3, 4, 5])
    serializer = ProductoSerializer(productos, many=True)
    productos_data = serializer.data

    for producto in productos_data:
        categoria = Categorias.objects.get(id=producto['categoria'])
        producto['categoria_nombre'] = categoria.nombre

    return Response(productos_data)

@api_view(['PUT'])
def producto_detalle(request, id):
    try:
        producto = Producto.objects.get(id=id)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductoSerializer(producto, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registrar_compra_aprobada(request):
    serializer = CompraAprobadaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'rol': user.rol,
            'user_id': user.id  # Incluye el user_id en la respuesta
        })
    return Response({'error': 'Invalid Credentials'}, status=400)

@api_view(['GET'])
def user_detail(request):
    if request.user.is_authenticated:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['POST'])
# def reset_password(request):
#     username = request.data.get('username')
#     email = request.data.get('email')
#     new_password = request.data.get('new_password')
    
#     try:
#         user = User.objects.get(username=username) if username else User.objects.get(email=email)
#         user.set_password(new_password)
#         user.save()
#         send_mail(
#             'Password Reset',
#             f'Hello {user.username}, your password has been reset.',
#             settings.DEFAULT_FROM_EMAIL,
#             [user.email],
#         )
#         return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request):
    username_or_email = request.data.get('username_or_email')
    new_password = request.data.get('new_password')
    
    try:
        user = User.objects.get(username=username_or_email)
    except User.DoesNotExist:
        try:
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    user.set_password(new_password)
    user.save()

    # Enviar un correo electrónico confirmando el cambio de contraseña
    send_mail(
        'Cambio de Contraseña',
        'Tu contraseña ha sido cambiada exitosamente.',
        'tu.mirwani@duocuc.cl',
        [user.email],
        fail_silently=False,
    )
    
    return Response({"success": "Contraseña cambiada exitosamente."}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_categories(request):
    categories = Categorias.objects.all()
    serializer = CategoriaSerializer(categories, many=True)
    return Response(serializer.data)    

@api_view(['GET', 'POST'])
def creacion(request):
    if request.method == 'GET':
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        file = request.FILES.get('imagen')
        
        serializer = ProductoSerializer(data=data)
        if serializer.is_valid():
            codigo = data.get('codigo')
            if codigo in Producto.objects.values_list('codigo', flat=True):
                return Response({"error": "Producto ya ingresado"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                
                producto = serializer.save(imagen=file)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def get_categories(request):
    categories = Producto.objects.values_list('categoria', flat=True).distinct()
    return JsonResponse(list(categories), safe=False)



@csrf_exempt
def getexchangerate(request):
    user = 'mirwanitushar@gmail.com'
    password = 'Tushargamer200_'
    firstdate = '2024-05-17'
    lastdate = '2024-05-17'
    timeseries = 'F073.TCO.PRE.Z.D'

    url = f"https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user={user}&pass={password}&firstdate={firstdate}&lastdate={lastdate}&timeseries={timeseries}&function=GetSeries"
    response = requests.get(url)
    data = response.json()

    return JsonResponse(data)


@api_view(['GET'])
def productos_por_categoria(request, categoria_id):
    productos = Producto.objects.filter(categoria_id=categoria_id)
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_payment_preference(request):
    sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
    items = request.data.get('items')
    stock_source = request.data.get('stock_source')
    preference_data = {
        "items": [
            {
                "title": item["title"],
                "quantity": item["quantity"],
                "unit_price": float(item["unit_price"]),
                "currency_id": item["currency_id"]
            } for item in items
        ],
        "back_urls": {
            "success": "http://localhost:8100/success",
            "failure": "http://localhost:8100/failure",
            "pending": "http://localhost:8100/pending"
        },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    # Actualizar el stock
    for item in items:
        product_id = item['id']
        quantity = item['quantity']
        try:
            product = Producto.objects.get(id=product_id)
            if stock_source == "online":
                product.stock_online -= quantity
            else:
                product.stock_tienda -= quantity
            product.save()
        except Producto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    return JsonResponse(preference)


@api_view(['GET'])
def productos_por_marca(request, marca):
    try:
        productos = Producto.objects.filter(marca=marca)
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)





