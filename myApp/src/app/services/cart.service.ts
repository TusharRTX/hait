import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MercadopagoService } from '../mercadopago.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor(private mercadopagoService: MercadopagoService) {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock_online) {
        existingItem.quantity += 1;
      } else {
        console.log('No hay suficiente stock online');
      }
    } else {
      if (product.stock_online > 0) {
        this.items.push({ ...product, quantity: 1 });
      } else {
        console.log('No hay suficiente stock online');
      }
    }
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  removeItem(product: any) {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  updateQuantity(product: any, quantity: number) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = quantity;
      if (existingItem.quantity <= 0) {
        this.removeItem(product);
      } else {
        this.saveCart();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.precio * item.quantity, 0);
  }

  checkout(items: any[], stockSource: string): Observable<any> {
    return this.mercadopagoService.createPaymentPreference(items, stockSource);
  }
}






