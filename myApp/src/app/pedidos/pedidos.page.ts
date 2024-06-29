import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController, private cartService: CartService,private menu: MenuController,private djangoApiService: DjangoapiService) {}

  ngOnInit() {
    this.djangoApiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApiService.role$.subscribe(role => {
      this.role = role;
    });

    console.log('Initializing PedidosPage...');
    this.djangoApiService.getPedidos().subscribe(
      (data) => {
        console.log('Pedidos fetched: ', data);
        this.pedidos = data;
      },
      (error) => {
        console.error('Error fetching pedidos: ', error);
      }
    );
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
            await this.djangoApiService.logout();
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

