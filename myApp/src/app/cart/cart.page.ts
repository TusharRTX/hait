import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCarrito();
  }
  ionViewWillEnter() {
    this.loadCarrito(); // Recargar el carrito cada vez que se entra a la vista
  }

  loadCarrito() {
    this.carrito = this.cartService.getCarrito();
    this.total = this.cartService.getTotal();
  }

  updateCantidad(productId: number, cantidad: number) {
    this.cartService.updateCantidad(productId, cantidad);
    this.loadCarrito();
  }
  

}
