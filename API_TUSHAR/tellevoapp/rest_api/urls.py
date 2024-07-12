from django.urls import path
from rest_api.views import generate_voucher, productos_por_marca, get_estado_pedido, guardar_pedido_final, get_detalles_con_estado, aprobar_pedido_bodeguero, getPedidosAprobados, register, user_detail,registrar_compra_aprobada, productos_disponibles, producto_detalle, getPedidos, aprobar_pedido, rechazar_pedido, update_estado_pedido
from .views import actualizar_stock, aprobar_pedido, aprobar_pedido_bodeguero, generate_voucher, get_detalles_con_estado, get_estado_pedido, get_voucher, get_vouchers, getPedidos, getPedidosAprobados, guardar_pedido_final, marcar_como_enviado, mark_voucher_as_sent, producto_detalle, productos_disponibles, rechazar_pedido, register, login, registrar_compra_aprobada, reset_password, update_estado_pedido, user_detail
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
from rest_api.views import guardar_pedido_final
from .views import guardar_pedido_final



# http://127.0.0.1:8000/api/"ENDPOINT"

urlpatterns=[
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('creacion', creacion, name="creacion"),
    path('user/', user_detail, name='user_detail'),
    path('reset-password/', reset_password, name='reset_password'),
    path('categorias', get_categories, name='categorias'),
    path('categorias/', get_categories, name="categorias"),
    path('getexchangerate', getexchangerate, name='getexchangerate'),
    path('productos_por_categoria/<int:categoria_id>/', productos_por_categoria, name='productos_por_categoria'),
    path('create_payment_preference/', create_payment_preference, name='create_payment_preference'),
    path('actualizar_stock/', actualizar_stock, name='actualizar_stock'),
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
    path('api/detalles_con_estado/', get_detalles_con_estado, name='get_detalles_con_estado'),
    path('api/update_estado_pedido/<int:id>/', update_estado_pedido, name='update_estado_pedido'),
    path('marcar_como_enviado/<int:id>/', marcar_como_enviado, name='marcar_como_enviado'),
    path('guardar_pedido_final/', guardar_pedido_final, name='guardar_pedido_final'),
    path('generate_voucher/', generate_voucher, name='generate_voucher'),
    path('voucher/<int:voucher_id>/', get_voucher, name='get_voucher'),
    path('vouchers/', get_vouchers, name='get_vouchers_by_date'),
    path('api/mark_voucher_as_sent/<int:voucher_id>/', mark_voucher_as_sent, name='mark_voucher_as_sent'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
