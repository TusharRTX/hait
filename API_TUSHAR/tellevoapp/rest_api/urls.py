from django.urls import path
from rest_api.views import productos_por_marca, register, user_detail
from .views import register, login, user_detail
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
    path('categorias', get_categories, name='categorias'),
    path('categorias/', get_categories, name="categorias"),
    path('getexchangerate', getexchangerate, name='getexchangerate'),
    path('productos_por_categoria/<int:categoria_id>/', productos_por_categoria, name='productos_por_categoria'),
    path('create_payment_preference/', create_payment_preference, name='create_payment_preference'),
    # path('handle_payment_failure/', handle_payment_failure, name='handle_payment_failure'),
    path('productos_por_marca/<str:marca>/', productos_por_marca, name='productos_por_marca'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

