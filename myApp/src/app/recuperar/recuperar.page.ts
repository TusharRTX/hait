import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  nuevoProducto = {
    name: '',
    description: '',
    price: 0,
    url_imagen: '',
    category: 1 // ID de la categoría por defecto
  };
  categorias: any[] = [];

  constructor(private djangoApi: DjangoapiService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.djangoApi.getCategories().subscribe(
      (response: any) => {
        this.categorias = response.categorias;
      },
      (error: any) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  guardarProducto() {
    this.djangoApi.createProduct(this.nuevoProducto).subscribe(
      (response: any) => {
        console.log('Producto creado exitosamente', response);
      },
      (error: any) => {
        console.error('Error al crear el producto', error);
      }
    );
  }
}
