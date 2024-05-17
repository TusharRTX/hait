import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  productos: any[] = [];

  constructor(private djangoApi: DjangoapiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.obtenerProductosDeEquipos();
    this.cargaProductos()
  }
    cargaProductos(){
    this.djangoApi.getProducto().subscribe(
      (res)=>{
       console.log(res);
     }
     ,
     (error)=>{
        console.log(error);
     }
   )
 }

  obtenerProductosDeEquipos() {
    this.djangoApi.getProductosPorCategoria('equipo').subscribe(
      (data: any) => {
        this.productos = data;
      },
      (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  
  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }

  register() {
    this.navCtrl.navigateForward('/registro');
  }

}
