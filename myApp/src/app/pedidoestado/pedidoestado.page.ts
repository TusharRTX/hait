import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ModalController } from '@ionic/angular';
import { EditarestadoComponent } from '../editarestado/editarestado.component';
import { Router } from '@angular/router';


interface Pedido {
  id: number;
  usuario_username: string;
  usuario_nombre: string;
  usuario_apellido: string;
  usuario_correo: string;
  usuario_telefono: string;
  usuario_direccion: string;
  usuario_rut: string;
  pedido_total: number;
  pedido_delivery_method: string;
  pedido_estado: string;
  productos: any[];
  nota_bodeguero: string;
  estado_bodeguero: string;
  enviada_a_vendedor: boolean;
}

@Component({
  selector: 'app-pedidoestado',
  templateUrl: './pedidoestado.page.html',
  styleUrls: ['./pedidoestado.page.scss'],
})
export class PedidoestadoPage implements OnInit {
  detallesConEstado: Pedido[] = [];
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
    private djangoApiService: DjangoapiService
  ) {}

  ngOnInit() {
    this.LoadPedidos();
    this.djangoApiService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApiService.role$.subscribe((role) => {
      this.role = role;
    });
  }

  async LoadPedidos() {
    this.djangoApiService.getDetallesConEstado().subscribe(
      (data: any[]) => {
        this.detallesConEstado = data
          .map((item: any) => {
            item.productos = JSON.parse(item.productos);
            return item as Pedido; // Asegurarse de que item es de tipo Pedido
          })
          .filter((pedido: Pedido) => !pedido.enviada_a_vendedor); // Filtra pedidos que no han sido enviados
        console.log(this.detallesConEstado);
      },
      (error) => {
        console.error('Error fetching detalles con estado:', error);
      }
    );
  }

  async onPedidoSelected(pedido: any) {
    const modal = await this.modalController.create({
      component: EditarestadoComponent,
      componentProps: { pedido: pedido },
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
      this.presentToast('Estado actualizado exitosamente', 'success');
      this.LoadPedidos(); // Volver a cargar todos los pedidos después de la actualización
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  async enviarAlVendedor(pedido: Pedido) {
    const pedidoFinal = {
        id: pedido.id,  // Asegúrate de incluir el ID aquí
        usuario_username: pedido.usuario_username || '',
        usuario_nombre: pedido.usuario_nombre || '',
        usuario_apellido: pedido.usuario_apellido || '',
        usuario_correo: pedido.usuario_correo || '',
        usuario_telefono: pedido.usuario_telefono || '',
        usuario_direccion: pedido.usuario_direccion || '',
        usuario_rut: pedido.usuario_rut || '',
        pedido_total: pedido.pedido_total || 0,
        pedido_delivery_method: pedido.pedido_delivery_method || '',
        pedido_estado: pedido.pedido_estado || '',
        productos: JSON.stringify(pedido.productos) || '[]',
        nota_bodeguero: pedido.nota_bodeguero || '',
        estado_bodeguero: pedido.estado_bodeguero || '',
        enviada_a_vendedor: true // Asegúrate de que este campo esté en True
    };

    console.log('Datos que se envían:', pedidoFinal); // Para depuración
    this.djangoApiService.guardarPedidoFinal(pedidoFinal).subscribe(
        (response) => {
            this.presentToast('Pedido enviado al vendedor exitosamente', 'success');
            // Recargar los pedidos después de enviar al vendedor
            this.LoadPedidos(); // <-- Aquí recargamos los pedidos
        },
        (error) => {
            this.presentToast('Error al enviar el pedido al vendedor', 'danger');
            console.error(error);
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












