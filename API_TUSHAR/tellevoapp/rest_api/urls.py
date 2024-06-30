from django.urls import path
from rest_api.views import productos_por_marca, get_estado_pedido, editar_estado_pedido, aprobar_pedido_bodeguero, getPedidosAprobados, register, user_detail,registrar_compra_aprobada, productos_disponibles, producto_detalle, getPedidos, aprobar_pedido, rechazar_pedido
from .views import aprobar_pedido, aprobar_pedido_bodeguero, editar_estado_pedido, get_estado_pedido, getPedidos, getPedidosAprobados, producto_detalle, productos_disponibles, rechazar_pedido, register, login, registrar_compra_aprobada, reset_password, user_detail
from rest_api.views import creacion
from rest_api.views import login
from rest_api.views import get_categories
from rest_api.views import getexchangerate
from rest_api.views import get_categories
from rest_api.views import productos_por_categoria
from rest_api.views import create_payment_preference
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_api.views import productos_por_marca


# http://127.0.0.1:8000/api/"ENDPOINT"

urlpatterns=[
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user/', user_detail, name='user_detail'),
    path('reset-password/', reset_password, name='reset_password'),
    path('categorias', get_categories, name='categorias'),
    path('categorias/', get_categories, name="categorias"),
    path('getexchangerate', getexchangerate, name='getexchangerate'),
    path('productos_por_categoria/<int:categoria_id>/', productos_por_categoria, name='productos_por_categoria'),
    path('create_payment_preference/', create_payment_preference, name='create_payment_preference'),
    path('registrar_compra/', registrar_compra_aprobada, name='registrar_compra_aprobada'),
    path('productos_por_marca/<str:marca>/', productos_por_marca, name='productos_por_marca'),
    path('productos_disponibles/', productos_disponibles, name='productos_disponibles'),
    path('get_pedidos/', getPedidos, name='get_pedidos'),
    path('api/productos/<int:id>/', producto_detalle, name='producto_detalle'),
    path('aprobar_pedido/<int:id>/', aprobar_pedido, name='aprobar_pedido'),
    path('rechazar_pedido/<int:id>/', rechazar_pedido, name='rechazar_pedido'),
    path('get_pedidos_aprobados/', getPedidosAprobados, name='get_pedidos_aprobados'),
    path('aprobar_pedido_bodeguero/<int:id>/', aprobar_pedido_bodeguero, name='aprobar_pedido_bodeguero'),
    path('estado_pedido/<int:id>/', get_estado_pedido, name='get_estado_pedido'),
    path('editar_estado_pedido/<int:id>/', editar_estado_pedido, name='editar_estado_pedido'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

