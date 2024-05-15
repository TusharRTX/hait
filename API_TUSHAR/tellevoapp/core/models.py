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

class Producto(models.Model):
    
    codigo = models.CharField(max_length=10,verbose_name = "patente")
    categoria= models.CharField(max_length=10,verbose_name = "cate")
    marca = models.CharField(max_length=10,verbose_name = "Hora de inicio del Viaje")
    nombre = models.CharField(max_length=10,verbose_name = "noe")
    precio = models.IntegerField(verbose_name = "Capacidad de Pasajeros")
    url_imagen = models.URLField(max_length=500, verbose_name = "url_imagen")
    def __str__(self):
        return self.codigo
    
