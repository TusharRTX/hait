from django.contrib import admin
from .models import Usuario
from .models import Producto
from .models import Categorias

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Producto)
admin.site.register(Categorias)

