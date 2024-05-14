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
    category: 0 // Inicializar con 0
  };
  categories: any[] = []; 
  selectedCategory: number = 0;

  constructor(private djangoApi: DjangoapiService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.djangoApi.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  guardarProducto() {
    this.nuevoProducto.category = this.selectedCategory; // Asignar la categoría seleccionada al nuevo producto
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

