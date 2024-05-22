from rest_framework import generics
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
from core.models import Producto
from .serializers import ProductoSerializer
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from core.models import Categorias
from django.http import JsonResponse
from core.models import Categorias, Producto
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import mercadopago
from django.conf import settings



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
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':

        serializer = ProductoSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            codigo = request.POST.get('codigo', None)
            print(codigo)
            if codigo in Producto.objects.values_list('codigo', flat=True):
                print("Producto Ingresado")
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
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

@csrf_exempt
@api_view(['POST'])
def create_payment_preference(request):
    sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
    items = request.data.get('items')
    preference_data = {
        "items": items,
        "back_urls": {
            "success": "http://localhost:8100/success",
            "failure": "http://localhost:8100/failure",
            "pending": "http://localhost:8100/pending"
        },
        "auto_return": "approved",
    }
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return JsonResponse(preference)


    




