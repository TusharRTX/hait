import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.page.html',
  styleUrls: ['./herramientas.page.scss'],
})
export class HerramientasPage implements OnInit {
  isMenuVisible = false;
  products: any[] = [];

  constructor(private apiService: DjangoapiService, private cartService: CartService) { }

  ngOnInit() {
    const categoryId = 2; // ID de la categoría "equipo"
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
