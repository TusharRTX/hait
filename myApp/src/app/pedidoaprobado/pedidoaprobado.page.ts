import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-pedidoaprobado',
  templateUrl: './pedidoaprobado.page.html',
  styleUrls: ['./pedidoaprobado.page.scss'],
})
export class PedidoaprobadoPage implements OnInit {
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  pedidosAprobados: any[] = [];

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController, private cartService: CartService,private menu: MenuController,private djangoApiService: DjangoapiService) {}

  ngOnInit() {
    this.fetchPedidosAprobados();

    this.djangoApiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApiService.role$.subscribe(role => {
      this.role = role;
    });

  }

  ionViewWillEnter() {
    this.fetchPedidosAprobados();
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

  fetchPedidosAprobados() {
    this.djangoApiService.getPedidosAprobados().subscribe((data: any[]) => {
      this.pedidosAprobados = data.map(pedido => {
        pedido.productos = JSON.parse(pedido.productos);
        return pedido;
      });
      console.log('Pedidos aprobados fetched:', this.pedidosAprobados);
    }, error => {
      console.error('Error fetching pedidos aprobados:', error);
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  
}




