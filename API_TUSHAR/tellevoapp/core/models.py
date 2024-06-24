from django.db import models

# Create your models here.
class Usuario(models.Model):
    
    user = models.CharField(max_length=20,verbose_name = "Nombre Usuario")
    password = models.CharField(max_length=20, verbose_name = "Contraseña Usuario")
    nombre = models.CharField(max_length=20, verbose_name = "Nombre de la Persona")
    correo = models.EmailField(max_length=50, verbose_name = "Correo de la Persona")
    rol = models.CharField(max_length=15, verbose_name = "Rol")
    def __str__(self):
        return self.user


class Categorias(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    codigo = models.CharField(max_length=10)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE, related_name="productos")
    marca = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)
    stock_online = models.IntegerField(default=0)
    stock_tienda = models.IntegerField(default=0)

    def __str__(self):
        return self.codigo
