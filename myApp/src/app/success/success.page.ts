import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  
import { DjangoapiService } from '../conexion/djangoapi.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  items: any[] = [];
  total: number = 0;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = ''

  constructor(private alertController: AlertController,private router: Router,private apiService: DjangoapiService, private cartService: CartService,private menu: MenuController) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.clearCart();
  
    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  
    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
  
    this.apiService.getUserId().then(userId => {
      console.log('User ID:', userId);
      const compra = {
        usuario: userId || null,  // ID del usuario o null si es invitado
        productos: this.items.map(item => ({
          producto: item.id,
          cantidad: item.quantity
        })),
        total: this.total
      };
  
      this.apiService.registrarCompra(compra).subscribe(
        response => {
          console.log('Compra registrada exitosamente', response);
          // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
        },
        error => {
          console.error('Error al registrar la compra', error);
          // Mostrar mensaje de error al usuario
          this.presentAlert('Error', 'Hubo un error al registrar la compra. Intenta nuevamente.');
        }
      );
    });
  }
  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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

  
}

