import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ModalController } from '@ionic/angular';
import { AprobarPedidoModalComponent } from '../aprobar-pedido-modal/aprobar-pedido-modal.component';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedidobodeguero',
  templateUrl: './pedidobodeguero.page.html',
  styleUrls: ['./pedidobodeguero.page.scss'],
})
export class PedidobodegueroPage implements OnInit {
  pedidosAprobados: any[] = [];
  nota_bodeguero: string = '';
  estado: string = '';
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  isLoading: boolean = true;

  constructor(private modalController: ModalController,private alertController: AlertController,private router: Router,private toastController: ToastController,private menu: MenuController,private djangoApiService: DjangoapiService) {}

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
  
  fetchPedidosAprobados() {
    this.isLoading = true;  // Mostrar la animación de carga
    this.djangoApiService.getPedidosAprobados().subscribe(
      (data: any[]) => {
        this.pedidosAprobados = data.map((pedido) => {
          pedido.productos = JSON.parse(pedido.productos).map((producto: any) => {
            return {
              codigo: producto.codigo || 'N/A', // Asegurarse de que el campo código siempre exista
              nombre: producto.nombre,
              cantidad: producto.cantidad,
              precio: producto.precio,
            };
          });
          return pedido;
        });
        console.log('Pedidos aprobados fetched:', this.pedidosAprobados);
        this.isLoading = false;  // Ocultar la animación de carga
      },
      (error) => {
        console.error('Error fetching pedidos aprobados:', error);
        this.isLoading = false;  // Ocultar la animación de carga
      }
    );
  }
  


  async aprobarPedido(id: number) {
    const modal = await this.modalController.create({
        component: AprobarPedidoModalComponent,
        componentProps: {
            nota_bodeguero: this.nota_bodeguero,
            estado: this.estado
        }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
        this.djangoApiService.aprobarPedidoBodeguero(id, data.estado, data.nota_bodeguero).subscribe(
            response => {
                console.log('Pedido aprobado:', response);
                this.fetchPedidosAprobados(); // Actualizar la lista de pedidos
                this.showToast('Pedido aprobado exitosamente', 'success');
            },
            error => {
                console.error('Error al aprobar el pedido:', error);
                this.showToast('Error al aprobar el pedido', 'danger');
            }
        );
    }
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

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
