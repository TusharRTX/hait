import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ModalController } from '@ionic/angular';
import { EditarestadoComponent } from '../editarestado/editarestado.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidocliente',
  templateUrl: './pedidocliente.page.html',
  styleUrls: ['./pedidocliente.page.scss'],
})
export class PedidoclientePage implements OnInit {
  detallesConEstado: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  public user: any = null;
  pedidosAprobados: any[] = [];
  selectedPedido: any;
  isLoading: boolean = true;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private djangoApiService: DjangoapiService
  ) {}

  ngOnInit() {
    this.djangoApiService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      console.log('isAuthenticated:', isAuth);
    });
    this.djangoApiService.role$.subscribe((role) => {
      this.role = role;
      console.log('Role:', role);
    });
    this.djangoApiService.user$.subscribe((user) => {
      this.user = user;
      console.log('Authenticated user:', user);
      if (this.user) {
        this.LoadPedidos();
      }
    });
  }

  async LoadPedidos() {
    if (!this.user) {
      console.error('No user logged in');
      return;
    }

    this.isLoading = true;  
    this.djangoApiService.getDetallesConEstado().subscribe(
      (data: any[]) => {
        this.detallesConEstado = data
          .map((item: any) => {
            item.productos = JSON.parse(item.productos);
            return item;
          })
          .filter((pedido: any) => {
            const match = pedido.usuario_nombre === this.user.nombre && pedido.usuario_apellido === this.user.apellido;
            // console.log('Checking match for pedido:', pedido, 'Match:', match);
            return match;
          }); // Filtra pedidos que son del usuario autenticado
        console.log('Filtered pedidos:', this.detallesConEstado);
        this.isLoading = false;  
      },
      (error) => {
        console.error('Error fetching detalles con estado:', error);
        this.isLoading = false;  
      }
    );
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

}




