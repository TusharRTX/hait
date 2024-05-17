import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {

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

  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }

  register() {
    this.navCtrl.navigateForward('/registro');
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
