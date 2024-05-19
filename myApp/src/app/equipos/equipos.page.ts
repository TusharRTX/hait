import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  
  products: any[] = [];

  constructor(
    private apiService: DjangoapiService,
    private navCtrl: NavController,
    private cartService: CartService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    const categoryId = 1; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }



  openCategoriesMenu() {
    this.menu.open('first');
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}





