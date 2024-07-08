import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { MercadopagoService } from '../mercadopago.service';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(
 
    private popoverController: PopoverController,
    private cartService: CartService,
    private djangoApi: DjangoapiService,
    private mercadopagoService: MercadopagoService,
    private alertController: AlertController,
    private router: Router,
  ) {}


  ngOnInit() {
    this.loadDollarValue();

    this.djangoApi.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApi.role$.subscribe(role => {
      this.role = role;
    });

    this.djangoApi.role$.subscribe(role => {
      this.role = role;
    });

  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: async () => {
            await this.djangoApi.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
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
    if (!this.isAuthenticated) {
      this.presentAlert('No estás autenticado', 'Por favor, inicia sesión para continuar.');
      return;
    }
  
    const user = this.djangoApi.userSubject.getValue();
  
    const items = this.items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      title: item.nombre,
      unit_price: currency === 'USD' ? item.precio / this.dollarValue : item.precio,
      currency_id: currency
    }));
  
    const voucherData = {
      items: items,
      total: this.total,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido
      }
    };

    this.djangoApi.generateVoucher(voucherData).subscribe(
      response => {
        console.log('Received response:', response);
        if (response.voucher_id) {
          // Proceder con el checkout si la generación del voucher es exitosa
          this.cartService.checkout(items, this.stockSource).subscribe(
            checkoutResponse => {
              if (checkoutResponse.init_point) {
                // Guardar el voucherId en el local storage para accederlo después
                localStorage.setItem('voucherId', response.voucher_id.toString());
                window.location.href = checkoutResponse.init_point;
              } else {
                console.error('No init_point in response', checkoutResponse);
              }
            },
            error => {
              console.error('Payment initiation failed', error);
            }
          );
        } else {
          console.error('Voucher ID not returned', response);
        }
      },
      error => {
        console.error('Voucher generation failed', error);
      }
    );
  }
  
  
  

  onStockSourceChange(event: any) {
    this.stockSource = event.detail.value; // Update stockSource variable on selection change
  }
  
  generateVoucher() {
    if (!this.isAuthenticated) {
      alert('No estás autenticado, por favor inicia sesión para continuar.');
      return;
    }
  
    const user = this.djangoApi.userSubject.getValue();
    console.log('User:', user);
  
    const voucherData = {
      items: this.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        title: item.nombre,
        unit_price: item.precio
      })),
      total: this.total,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido
      }
    };
  
    console.log('Sending voucher data:', voucherData);
  
    this.djangoApi.generateVoucher(voucherData).subscribe(
      response => {
        console.log('Received response:', response);
        if (response.voucher_id) {
          this.router.navigate(['/successvoucher'], { state: { voucherId: response.voucher_id } });
        } else {
          console.error('Voucher ID not returned', response);
        }
      },
      error => {
        console.error('Voucher generation failed', error);
      }
    );
    this.djangoApi.actualizarStock(this.items, this.stockSource).subscribe(
      response => {
        console.log('Stock actualizado correctamente:', response);
      },
      error => {
        console.error('Error al actualizar el stock:', error);
      }
    ); 
  }
  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
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







