from django.urls import path
from rest_api.views import lista_user
# from rest_api.views import lista_viaje
from rest_api.views import login
from rest_api.views import get_categories, create_product


urlpatterns=[
    path('lista_user', lista_user, name="Lista de Registro"),
    # path('lista_viaje', lista_viaje, name="Lista de Viajes"),
    path('login/', login, name="login"),
    path('get_categories', get_categories, name='get_categories'),
    path('create_product', create_product, name='create_product'),
]