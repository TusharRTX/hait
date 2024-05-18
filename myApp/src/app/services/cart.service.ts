import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = [];

  constructor() {
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
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
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
}





