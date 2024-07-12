import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  selectedDate: string = '';
  vouchers: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  isLoading: boolean = false;

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController,private apiService: DjangoapiService,private menu: MenuController) {}

  ngOnInit() {
    this.selectedDate = new Date().toISOString().split('T')[0]; // Set default to today's date
    this.fetchVouchers();

    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
  }

  fetchVouchers() {
    if (this.selectedDate) {
      this.isLoading = true;  
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];  // Formatea la fecha a YYYY-MM-DD
      this.apiService.getVouchers(formattedDate).subscribe(
        (response) => {
          this.vouchers = response;
          this.vouchers.forEach(voucher => {
            if (voucher.enviado_info && voucher.enviado_info.enviado) {
              voucher.enviado_info.enviado_at_formatted = this.formatDate(voucher.enviado_info.enviado_at);
            }
          });
          this.isLoading = false;  
        },
        (error) => {
          console.error('Error fetching vouchers:', error);
          this.isLoading = false; 
        }
      );
    }
  }

  enviarCorreo(voucher: any) {
    const email = voucher.user.correo;
    const subject = `Comprobante de venta ${voucher.voucher_id}`;
    const body = `
  Comprobante de Venta: ${voucher.voucher_id}
  Emitido por: ${voucher.user.nombre} ${voucher.user.apellido}
  Total: ${voucher.total}
  Fecha: ${new Date(voucher.created_at).toLocaleDateString()}
  Items:
  ${voucher.items.map((item: any) => `${item.title} - Cantidad: ${item.quantity} - Precio Unitario: ${item.unit_price}`).join('\n')}
  No valido como boleta
  
  Logo:
  https://media.discordapp.net/attachments/968742341613596692/1241022234265518242/logo2_preview_rev_1.png?ex=6691dac5&is=66908945&hm=7721e602804f06b3ca77a9277659592eaa14e4c196db80096ce86f2c4b2438a8&=&format=webp&quality=lossless
  `;
  
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    this.apiService.markVoucherAsSent(voucher.voucher_id).subscribe(
      response => {
        voucher.enviado_info.enviado = true;
        voucher.enviado_info.enviado_at = response.enviado_at; // Actualiza la fecha de envío con la respuesta de la API
        voucher.enviado_info.enviado_at_formatted = this.formatDate(response.enviado_at);
        console.log('Voucher marcado como enviado:', response);
        this.presentToast('Pedido enviado al cliente');
      },
      error => {
        console.error('Error marking voucher as sent:', error);
      }
    );
  }


  async presentToast(message: string) {
  const toast = await this.toastController.create({
  message: message,
  duration: 2000,
  color: 'success',
  position: 'top'
  });
  toast.present();
  }

  private formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}







  



