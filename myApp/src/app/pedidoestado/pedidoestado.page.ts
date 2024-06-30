import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { MenuController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EditarestadoComponent } from '../editarestado/editarestado.component';

@Component({
  selector: 'app-pedidoestado',
  templateUrl: './pedidoestado.page.html',
  styleUrls: ['./pedidoestado.page.scss'],
})
export class PedidoestadoPage implements OnInit {
  detallesConEstado: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  pedidosAprobados: any[] = [];
  selectedPedido: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private menu: MenuController,
    private djangoApiService: DjangoapiService
  ) {}

  ngOnInit() {
    this.LoadPedidos();
    this.djangoApiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApiService.role$.subscribe(role => {
      this.role = role;
    });
  }
  
  LoadPedidos() {
    this.djangoApiService.getDetallesConEstado().subscribe((data) => {
      this.detallesConEstado = data.map((item: any) => {
        item.productos = JSON.parse(item.productos);
        return item;
      });
      console.log(this.detallesConEstado);
    });
  }
  
  async onPedidoSelected(pedido: any) {
    const modal = await this.modalController.create({
      component: EditarestadoComponent,
      componentProps: { pedido: pedido }
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.onEstadoActualizado(result.data);
      }
    });
  
    return await modal.present();
  }
  
  onEstadoActualizado(updatedPedido: any) {
    const index = this.detallesConEstado.findIndex((p) => p.id === updatedPedido.id);
    if (index !== -1) {
      this.detallesConEstado[index] = updatedPedido;
    }
    this.presentToast('Estado actualizado exitosamente', 'success');
    this.LoadPedidos(); // Volver a cargar todos los pedidos después de la actualización
  }
  
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
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
              },
            },
          ],
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




