import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MercadopagoService } from '../mercadopago.service';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor(private mercadopagoService: MercadopagoService, private djangoapiService: DjangoapiService) {
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

  addToCart(product: any): boolean {
    const existingItem = this.items.find(item => item.id === product.id);
    let added = false;

    // Obtén el rol del usuario desde el servicio DjangoapiService
    this.djangoapiService.role$.subscribe(role => {
      if (existingItem) {
        if (existingItem.quantity < product.stock_online || role === 'vendedor') {
          existingItem.quantity += 1;
          this.saveCart();
          added = true;
        } else {
          console.log('No hay suficiente stock online');
          added = false;
        }
      } else {
        if (product.stock_online > 0 || role === 'vendedor') {
          this.items.push({ ...product, quantity: 1 });
          this.saveCart();
          added = true;
        } else {
          console.log('No hay suficiente stock online');
          added = false;
        }
      }
    });

    return added;
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






