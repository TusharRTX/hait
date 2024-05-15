import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  nuevoProducto = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImageUrl: '',
    selectedCategory: 0 // Inicializar con 0
  };
  categories: any[] = []; 

  constructor(private djangoApi: DjangoapiService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.djangoApi.getCategories().subscribe(
      (response) => {
        // Verificar si response.categories es una matriz
        if (Array.isArray(response.categories)) {
          this.categories = response.categories;
          if (this.categories.length > 0) {
            this.nuevoProducto.selectedCategory = this.categories[0].id; 
          }
        } else {
          console.error('El servidor no devolvió una lista de categorías válida:', response);
        }
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }



  createProduct() {
    const productData = {
      name: this.nuevoProducto.productName,
      description: this.nuevoProducto.productDescription,
      price: this.nuevoProducto.productPrice,
      url_imagen: this.nuevoProducto.productImageUrl,
      category_id: this.nuevoProducto.selectedCategory
    };
  
    this.djangoApi.createProduct(productData).subscribe(
      (response) => {
        console.log('Producto creado exitosamente:', response);
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
}
