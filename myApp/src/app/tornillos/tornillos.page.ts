import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tornillos',
  templateUrl: './tornillos.page.html',
  styleUrls: ['./tornillos.page.scss'],
})
export class TornillosPage implements OnInit {
  products: any[] = [];

  constructor(private toastController: ToastController,private apiService: DjangoapiService, private cartService: CartService,private menu: MenuController) { }

  ngOnInit() {
    const categoryId = 4; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showToast();
  }
  
  async showToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  openCategoriesMenu() {
    this.menu.open('first');
  }

}
