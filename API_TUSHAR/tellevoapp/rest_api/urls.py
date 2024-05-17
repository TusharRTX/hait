from django.urls import path
from rest_api.views import lista_user
from rest_api.views import creacion
from rest_api.views import login
from rest_api.views import get_categories
from rest_api.views import getexchangerate
from rest_api.views import get_categories
from rest_api.views import productos_por_categoria


urlpatterns=[
    path('lista_user', lista_user, name="Lista de Registro"),
    path('creacion', creacion, name="creacion"),
    path('login/', login, name="login"),
    path('categorias', get_categories, name='categorias'),
    path('getexchangerate', getexchangerate, name='getexchangerate'),
    path('productos_por_categoria/<int:categoria_id>/', productos_por_categoria, name='productos_por_categoria'),
]


