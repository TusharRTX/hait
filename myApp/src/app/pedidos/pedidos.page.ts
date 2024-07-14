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
  isLoading: boolean = true;

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController, private cartService: CartService,private menu: MenuController,private djangoApiService: DjangoapiService) {}

  ngOnInit() {
    this.fetchPedidos();

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

  fetchPedidos() {
    this.isLoading = true;  // Mostrar la animación de carga
    this.djangoApiService.getPedidos().subscribe(
      (data: any[]) => {
        this.pedidos = data;
        console.log('Pedidos fetched:', this.pedidos);
        this.isLoading = false;  // Ocultar la animación de carga
      },
      error => {
        console.error('Error fetching pedidos:', error);
        this.isLoading = false;  // Ocultar la animación de carga
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
        dropdown.style.top = `${rect.bottom}px`; 
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }

  async aprobarPedido(id: number) {
    this.djangoApiService.aprobarPedido(id).subscribe(
      async (response) => {
        console.log('Pedido aprobado:', response);
        await this.showToast('Pedido aprobado', 'success');
        this.fetchPedidos(); // Vuelve a obtener la lista de pedidos para actualizar la vista
      },
      async (error) => {
        console.error('Error al aprobar el pedido:', error);
        await this.showToast('Error al aprobar el pedido', 'danger');
      }
    );
  }

  async rechazarPedido(id: number) {
    this.djangoApiService.rechazarPedido(id).subscribe(
      async (response) => {
        console.log('Pedido rechazado:', response);
        await this.showToast('Pedido rechazado', 'danger');
        this.fetchPedidos(); // Vuelve a obtener la lista de pedidos para actualizar la vista
      },
      async (error) => {
        console.error('Error al rechazar el pedido:', error);
        await this.showToast('Error al rechazar el pedido', 'danger');
      }
    );
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



