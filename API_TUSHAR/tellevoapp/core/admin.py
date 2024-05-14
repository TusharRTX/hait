from django.contrib import admin
from .models import Usuario
from .models import Product,Category

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Product)
admin.site.register(Category)   
