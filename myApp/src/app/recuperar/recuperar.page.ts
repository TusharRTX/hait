import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  product: any = {
    name: '',
    description: '',
    price: 0,
    url_imagen: '',
    category: 0 // Aquí deberías asignar el ID de la categoría seleccionada
  };

  constructor(private router: Router,private http: HttpClient,private djangoApi: DjangoapiService) { }

  ngOnInit() {
  }
  
  createProduct(): void {
    this.djangoApi.createProduct(this.product).subscribe(
      (response) => {
        console.log('Producto creado exitosamente:', response);
        // Reinicia los campos del producto después de crearlo exitosamente
        this.product = {
          name: '',
          description: '',
          price: 0,
          url_imagen: '',
          category: 0
        };
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
}