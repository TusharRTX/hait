import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    
    this.loadCart();
  }

  loadCart() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  updateQuantity(item: any, event: any) {
    const quantity = +event.detail.value;
    if (quantity > 0) {
      this.cartService.updateQuantity(item, quantity);
    } else {
      this.cartService.removeItem(item);
    }
    this.loadCart();
  }
}




