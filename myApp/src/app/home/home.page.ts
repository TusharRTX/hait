import { Component } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productos: any[] = [];

  constructor(private djangoApi: DjangoapiService) {}

  ngOnInit(){
    this.cargaProductos()
  }

  cargaProductos(){
    this.djangoApi.getProducto().subscribe(
      (res)=>{
       console.log(res);
        this.productos = res;
     }
     ,
     (error)=>{
        console.log(error);
     }
   )
 }

}
