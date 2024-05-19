import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tornillos',
  templateUrl: './tornillos.page.html',
  styleUrls: ['./tornillos.page.scss'],
})
export class TornillosPage implements OnInit {
  isMenuVisible = false;
  products: any[] = [];

  constructor(private apiService: DjangoapiService, private cartService: CartService) { }

  ngOnInit() {
    const categoryId = 4; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }
  
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}
