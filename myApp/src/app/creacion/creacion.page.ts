import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {
  isMenuVisible = false;
  productoData: any = {
    codigo: "",
    categoria: "",
    marca: "",
    nombre: "",
    precio: "",
    url_imagen: ""
  }
  constructor(private djangoApi: DjangoapiService,private navCtrl: NavController) { }

  ngOnInit() {
  }


  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
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
