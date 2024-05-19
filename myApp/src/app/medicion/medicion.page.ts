import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {
  isMenuVisible = false;
  products: any[] = [];


  constructor(private apiService: DjangoapiService, private cartService: CartService) { }

  ngOnInit() {
    const categoryId = 5; // ID de la categoría "equipo"
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
