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
  
      // Agregar el logo
      const logoUrl = 'https://8f68b14p-8000.brs.devtunnels.ms/media/productos/ferremas_logo.png';
      doc.addImage(logoUrl, 'PNG', 10, 10, 22, 20);
  
      // Agregar título
      doc.setFontSize(20);
      doc.text('Comprobante de Venta', 10, 40);
  
      // Agregar fecha y hora de creación
      const createdAt = new Date(voucher.created_at);
      const date = createdAt.toLocaleDateString();
      const time = createdAt.toLocaleTimeString();
      doc.setFontSize(12);
      doc.text(`Fecha: ${date}`, 10, 50);
      doc.text(`Hora: ${time}`, 50, 50);
  
      // Agregar detalles del voucher
      doc.setFontSize(12);
      doc.text(`Voucher ID: ${voucher.voucher_id}`, 10, 60);
      doc.text(`Voucher Emitido por: ${voucher.user.nombre} ${voucher.user.apellido}`, 10, 70);
      doc.text('---------------------------------------------', 10, 80);
  
      // Agregar detalles de los items
      let startY = 90;
      doc.text('Producto', 10, startY);
      doc.text('Cantidad', 80, startY);
      doc.text('Precio Unitario', 150, startY);
  
      voucher.items.forEach((item: any, index: number) => {
        const y = startY + 10 + (index * 10);
        doc.text(item.title, 10, y);
        doc.text(item.quantity.toString(), 80, y);
        doc.text(parseFloat(item.unit_price).toFixed(2).toString(), 150, y);
      });
  
      // Agregar total
      const total = parseFloat(voucher.total);
      const finalY = startY + 10 + (voucher.items.length * 10);
      doc.text('---------------------------------------------', 10, finalY);
      doc.text(`Total: ${total.toFixed(2)}`, 10, finalY + 10);
  
      // Guardar el PDF
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

