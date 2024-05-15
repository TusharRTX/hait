import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {

  productoData: any = {
    codigo: "",
    marca: "",
    nombre: "",
    precio: "",
    url_imagen: ""
  }

  constructor(private djangoApi: DjangoapiService) { }

  ngOnInit() {
  }

  crearProducto() {
    this.djangoApi.crearProducto(this.productoData).subscribe(
      (response) => {
        
        console.log('Registro exitoso:', response);
      },
      (error) => {
        
        console.error('Error en el registro:', error);
      }
    );
  }

}
