import json
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
from core.models import Producto, Categorias, User, Voucher
from .serializers import CategoriaSerializer, ProductoSerializer, UserSerializer, VoucherSerializer
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from core.models import CompraAprobada
from .serializers import CompraAprobadaSerializer
from core.models import Producto, Categorias, User, CompraAprobada, DetallePedido
from .serializers import ProductoSerializer, CategoriaSerializer, UserSerializer, CompraAprobadaSerializer, CompraAprobadaCreateSerializer, EstadoPedidoSerializer
from core.models import CompraAprobada
from .serializers import  CompraAprobadaSerializer
from core.models import CompraAprobada
from .serializers import CompraAprobadaSerializer
from core.models import CompraAprobada, DetallePedido, EstadoPedido
from .serializers import DetallePedidoSerializer
from core.models import EstadoPedido
from .serializers import EstadoPedidoSerializer
from core.models import DetallePedido, EstadoPedido
from .serializers import DetallePedidoSerializer, EstadoPedidoSerializer
from rest_framework.response import Response
from rest_framework import status
from core.models import DetallePedido
from core.models import PedidoFinal
from .serializers import PedidoFinalSerializer
import json
from core.models import PedidoFinal
from .serializers import PedidoFinalSerializer    
from django.contrib.auth import get_user_model
from core.models import User
User = get_user_model()


@api_view(['POST'])
def generate_voucher(request):
    items = request.data.get('items')
    total = request.data.get('total')
    user_data = request.data.get('user')
    
    if not items or not total or not user_data:
        return Response({'error': 'Faltan datos requeridos'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(id=user_data['id'])
        voucher = Voucher.objects.create(
            items=items,
            total=total,
            user=user
        )
        return Response({'voucher_id': voucher.voucher_id}, status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_voucher(request, voucher_id):
    try:
        voucher = Voucher.objects.get(voucher_id=voucher_id)
        serializer = VoucherSerializer(voucher)
        return Response(serializer.data)
    except Voucher.DoesNotExist:
        return Response({'error': 'Voucher not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def guardar_pedido_final(request):
    try:
        data = request.data
        data['enviada_a_vendedor'] = True  

        print(f"Datos recibidos: {data}")  
        
        serializer = PedidoFinalSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(f"Errores del serializador: {serializer.errors}")  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Error: {str(e)}")  
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def marcar_como_enviado(request, id):
    try:
        estado_pedido = EstadoPedido.objects.get(id=id)
        estado_pedido.enviado = True
        estado_pedido.save()
        return Response({'status': 'Enviado actualizado'}, status=status.HTTP_200_OK)
    except EstadoPedido.DoesNotExist:
        return Response({'error': 'EstadoPedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PUT'])
def update_estado_pedido(request, id):
    try:
        estado_pedido = EstadoPedido.objects.get(id=id)
    except EstadoPedido.DoesNotExist:
        return Response({'error': 'EstadoPedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EstadoPedidoSerializer(estado_pedido, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_detalles_con_estado(request):
    try:
        estado_pedidos = EstadoPedido.objects.select_related('id_detallepedido').all()
        detalles_con_estado = []

        for estado_pedido in estado_pedidos:
            detalle_pedido = estado_pedido.id_detallepedido
            detalle_data = DetallePedidoSerializer(detalle_pedido).data
            estado_data = EstadoPedidoSerializer(estado_pedido).data
            combined_data = {**detalle_data, **estado_data}
            detalles_con_estado.append(combined_data)

        return Response(detalles_con_estado, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {str(e)}")  
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_estado_pedido(request, id):
    try:
        estado_pedido = EstadoPedido.objects.get(id_detallepedido=id)
        serializer = EstadoPedidoSerializer(estado_pedido)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except EstadoPedido.DoesNotExist:
        return Response({'error': 'EstadoPedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)    
    
@api_view(['POST'])
def aprobar_pedido_bodeguero(request, id):
    try:
        detalle_pedido = DetallePedido.objects.get(id=id)
        estado = request.data.get('estado', 'pendiente')
        nota_bodeguero = request.data.get('nota_bodeguero', '')

        estado_pedido = EstadoPedido.objects.create(
            id_detallepedido=detalle_pedido,
            estado=estado,
            nota_bodeguero=nota_bodeguero
        )

        serializer = EstadoPedidoSerializer(estado_pedido)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except DetallePedido.DoesNotExist:
        return Response({'error': 'DetallePedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    
@api_view(['POST'])
def aprobar_pedido(request, id):
    try:
        compra = CompraAprobada.objects.get(id=id)
        productos = compra.compraproducto_set.all()
        productos_list = [{'codigo': p.producto.codigo, 'nombre': p.producto.nombre, 'cantidad': p.cantidad, 'precio': p.producto.precio} for p in productos]

        detalle_pedido = DetallePedido.objects.create(
            id_compraaprobada=compra,
            usuario_username=compra.usuario.username,
            usuario_nombre=compra.usuario.nombre,
            usuario_apellido=compra.usuario.apellido,
            usuario_correo=compra.usuario.correo,
            usuario_telefono=compra.usuario.telefono,
            usuario_direccion=compra.usuario.direccion,
            usuario_rut=compra.usuario.rut,
            pedido_total=compra.total,
            pedido_delivery_method=compra.delivery_method,
            pedido_estado='aprobado',
            productos=json.dumps(productos_list)
        )
        serializer = DetallePedidoSerializer(detalle_pedido)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except CompraAprobada.DoesNotExist:
        return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def rechazar_pedido(request, id):
    try:
        compra = CompraAprobada.objects.get(id=id)
        productos = compra.compraproducto_set.all()
        productos_list = [{'codigo': p.producto.codigo, 'nombre': p.producto.nombre, 'cantidad': p.cantidad, 'precio': p.producto.precio} for p in productos]

        detalle_pedido = DetallePedido.objects.create(
            id_compraaprobada=compra,
            usuario_username=compra.usuario.username,
            usuario_nombre=compra.usuario.nombre,
            usuario_apellido=compra.usuario.apellido,
            usuario_correo=compra.usuario.correo,
            usuario_telefono=compra.usuario.telefono,
            usuario_direccion=compra.usuario.direccion,
            usuario_rut=compra.usuario.rut,
            pedido_total=compra.total,
            pedido_delivery_method=compra.delivery_method,
            pedido_estado='rechazado',
            productos=json.dumps(productos_list)
        )
        serializer = DetallePedidoSerializer(detalle_pedido)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except CompraAprobada.DoesNotExist:
        return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        

from django.db.models import Q

@api_view(['GET'])
def getPedidosAprobados(request):
    try:
        pedidos_aprobados = DetallePedido.objects.filter(pedido_estado='aprobado')
        pedidos_sin_aprobacion_bodeguero = pedidos_aprobados.filter(
            ~Q(id__in=EstadoPedido.objects.values_list('id_detallepedido_id', flat=True))
        )

        for pedido in pedidos_sin_aprobacion_bodeguero:
            estado_pedido = EstadoPedido.objects.filter(id_detallepedido_id=pedido.id).first()
            pedido.estado_bodeguero = estado_pedido.estado if estado_pedido else "No definido"
            pedido.nota_bodeguero = estado_pedido.nota_bodeguero if estado_pedido else "No definido"

        serializer = DetallePedidoSerializer(pedidos_sin_aprobacion_bodeguero, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
    serializer = CompraAprobadaCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def getPedidos(request):
    pedidos = CompraAprobada.objects.exclude(detallepedido__pedido_estado__in=['aprobado', 'rechazado'])
    serializer = CompraAprobadaSerializer(pedidos, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'rol': user.rol
        }, status=status.HTTP_201_CREATED)
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
            'nombre': user.nombre,  # Incluye el nombre
            'apellido': user.apellido,  # Incluye el apellido
            'user_id': user.id # Incluye el user_id en la respuesta
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

# @api_view(['GET', 'POST'])
# def creacion(request):
#     if request.method == 'GET':
#         productos = Producto.objects.all()
#         serializer = ProductoSerializer(productos, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         data = request.data
#         file = request.FILES.get('imagen')
#         serializer = ProductoSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save(imagen=file)
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

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

@api_view(['POST'])
def actualizar_stock(request):
    items = request.data.get('items')
    stock_source = request.data.get('stock_source')

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
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'status': 'Stock actualizado correctamente'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def productos_por_marca(request, marca):
    try:
        productos = Producto.objects.filter(marca=marca)
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)




