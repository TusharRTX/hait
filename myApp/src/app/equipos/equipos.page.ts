import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular'; 
import { CartService } from '../cart.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  products: any[] = [];

  constructor(private apiService: DjangoapiService, private navCtrl: NavController,private cartService: CartService) { }

  ngOnInit() {
    const categoryId = 1; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }


  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }
  
  register() {
    this.navCtrl.navigateForward('/registro');
  }
  
  addToCarrito(product: any) {
    this.cartService.addToCarrito(product);
  }


}

