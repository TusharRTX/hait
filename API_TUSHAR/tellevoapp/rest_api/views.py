
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from core.models import Productos
from .serializers import ProductosSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password


# Create your views here.
@csrf_exempt
@api_view(['GET','POST'])
def lista_user(request):
    if request.method == 'GET':
        categorias = Usuario.objects.all()
        serializer = UsuarioSerializer(categorias, many=True)
        return Response(serializer.data)
    elif request.method == 'POST': 
        serializer = UsuarioSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            user = request.POST.get('user', None)
            print(user)
            if user in Usuario.objects.values_list('user', flat=True):
                print("ingresao")
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    data = JSONParser().parse(request)

    username = data['username'] 
    password = data['password']

    try:
        user = User.objects.get(username= username)
    except User.DoesNotExist:
        return Response("Usuario Invalido")

    validar =check_password(password, user.password)

    if not validar:
        return("Datos Incorrectos") 
    else:
        token, created = Token.objects.get_or_create(user=user)

        return Response(token.key)



@api_view(['GET','POST'])
def creacion(request):
    if request.method == 'GET':
        productos = Productos.objects.all()
        serializer = ProductosSerializer(productos, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':

        serializer = ProductosSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            codigo = request.POST.get('codigo', None)
            print(codigo)
            if codigo in Productos.objects.values_list('codigo', flat=True):
                print("Producto Ingresado")
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
