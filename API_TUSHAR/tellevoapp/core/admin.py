from django.contrib import admin
from .models import Producto
from .models import Categorias
from .models import User

admin.site.register(User)
admin.site.register(Producto)
admin.site.register(Categorias)

