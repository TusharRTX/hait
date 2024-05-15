from django.urls import path
from rest_api.views import lista_user
from rest_api.views import creacion
from rest_api.views import login



urlpatterns=[
    path('lista_user', lista_user, name="Lista de Registro"),
    path('creacion', creacion, name="creacion"),
    path('login/', login, name="login"),

]