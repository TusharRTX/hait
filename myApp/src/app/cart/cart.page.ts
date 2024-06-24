import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { MercadopagoService } from '../mercadopago.service';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  isDropdownOpen = false;
  items: any[] = [];
  total: number = 0;
  dollarValue: number = 0;
  totalInUSD: number = 0;
  stockSource: string = 'online'; // Default stock source

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private cartService: CartService,
    private djangoApi: DjangoapiService,
    private mercadopagoService: MercadopagoService
  ) {}

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
      id: item.id,
      quantity: item.quantity,
      title: item.nombre,
      unit_price: currency === 'USD' ? item.precio / this.dollarValue : item.precio,
      currency_id: currency
    }));

    this.cartService.checkout(items, this.stockSource).subscribe(
      response => {
        // Handle success response
        if (response.init_point) {
          window.location.href = response.init_point;
        } else {
          console.error('No init_point in response', response);
        }
      },
      error => {
        // Handle error response
        console.error('Payment initiation failed', error);
      }
    );
  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.getElementById('products-category-button');
    if (dropdown && button) {
      if (open) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`; // adjust positioning
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }
}







