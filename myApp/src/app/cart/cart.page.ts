import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { MercadopagoService } from '../mercadopago.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: any[] = [];
  total: number = 0;
  dollarValue: number = 0;
  totalInUSD: number = 0;

  constructor(private cartService: CartService, private djangoApi: DjangoapiService,private mercadopagoService: MercadopagoService) {}

  ngOnInit() {
    this.loadDollarValue();
  }

  loadDollarValue() {
    this.djangoApi.getExchangeRate().subscribe((data: any) => {
      this.dollarValue = parseFloat(data.Series.Obs[0].value); 
      this.loadCart();
    });
  }

  loadCart() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    if (this.dollarValue > 0) {
      this.totalInUSD = parseFloat((this.total / this.dollarValue).toFixed(2));
    }
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

  checkout(currency: string) {
    const items = this.items.map(item => ({
      title: item.nombre,
      unit_price: currency === 'USD' ? item.precio / this.dollarValue : item.precio,
      quantity: item.quantity,
      currency_id: currency
    }));

    this.mercadopagoService.createPaymentPreference(items).subscribe((preference) => {
      window.location.href = preference.init_point;
    });
  }


}






