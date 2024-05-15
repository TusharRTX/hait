from django.contrib import admin
from .models import Usuario
from .models import Productos

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Productos)

