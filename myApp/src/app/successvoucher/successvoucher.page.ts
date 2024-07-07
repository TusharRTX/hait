import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  
import { jsPDF } from 'jspdf';
import { DjangoapiService } from '../conexion/djangoapi.service';
@Component({
  selector: 'app-successvoucher',
  templateUrl: './successvoucher.page.html',
  styleUrls: ['./successvoucher.page.scss'],
})
export class SuccessvoucherPage implements OnInit {
  items: any[] = [];
  total: number = 0;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = ''
  userId?: number;
  deliveryMethod: string = '';
  voucherId!: number;

  constructor(private alertController: AlertController,private router: Router,private apiService: DjangoapiService, private cartService: CartService,private menu: MenuController) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.voucherId = history.state.voucherId;
    this.cartService.clearCart();
    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
    this.apiService.getUserId().then(id => {
      this.userId = id;
    });
  }

  downloadVoucher() {
    this.apiService.getVoucher(this.voucherId).subscribe(voucher => {
      const doc = new jsPDF();
  
      doc.setFontSize(20);
      doc.text('Comprobante de Venta', 10, 20);
      doc.setFontSize(12);
      doc.text(`Voucher ID: ${voucher.voucher_id}`, 10, 30);
      doc.text(`Voucher Emitido por: ${voucher.user.nombre} ${voucher.user.apellido}`, 10, 40);
      doc.text('----------------------------------------', 10, 50);
  
      voucher.items.forEach((item: any, index: number) => {
        doc.text(`${item.title}    Cantidad: ${item.quantity}    Precio Unitario: ${item.unit_price}`, 10, 60 + index * 10);
      });
  
      doc.text('----------------------------------------', 10, 60 + voucher.items.length * 10);
      doc.text(`Total: ${voucher.total}`, 10, 70 + voucher.items.length * 10);
  
      doc.save('voucher.pdf');
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
        }, {
          text: 'Sí',
          handler: async () => {
            await this.apiService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
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

