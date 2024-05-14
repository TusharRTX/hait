
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import Usuario
from core.models import Viaje
from .serializers import UsuarioSerializer
from .serializers import ViajeSerializer
from django.contrib.auth.models import User

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


@csrf_exempt
@api_view(['GET','POST'])
def lista_viaje(request):
    if request.method == 'GET':
        categorias = Viaje.objects.all()
        serializer = ViajeSerializer(categorias, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':

        serializer = ViajeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            patente = request.POST.get('patente', None)
            print(patente)
            if patente in Viaje.objects.values_list('patente', flat=True):
                print("ingresao")
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        

@csrf_exempt
@api_view(['POST'])
def descontar(request):
    data = JSONParser().parse(request)
    viaje_id = data.get('viajeId', None)

    viaje = get_object_or_404(Viaje, id=viaje_id)

    if viaje.capacidad > 0:
        viaje.capacidad -= 1
        viaje.save(update_fields=['capacidad'])

        return Response({'message': 'Viaje seleccionado correctamente'})
    else:
        return Response({'error': 'No hay pasajeros disponibles en este viaje'}, status=status.HTTP_400_BAD_REQUEST)