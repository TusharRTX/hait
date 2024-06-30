import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ModalController } from '@ionic/angular';
import { AprobarPedidoModalComponent } from '../aprobar-pedido-modal/aprobar-pedido-modal.component';

@Component({
  selector: 'app-pedidobodeguero',
  templateUrl: './pedidobodeguero.page.html',
  styleUrls: ['./pedidobodeguero.page.scss'],
})
export class PedidobodegueroPage implements OnInit {
  pedidosAprobados: any[] = [];
  nota_bodeguero: string = '';
  estado: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private djangoApiService: DjangoapiService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.fetchPedidosAprobados();
  }

  ionViewWillEnter() {
    this.fetchPedidosAprobados();
  }

  fetchPedidosAprobados() {
    this.djangoApiService.getPedidosAprobados().subscribe((data: any[]) => {
      this.pedidosAprobados = data.map(pedido => {
        pedido.productos = JSON.parse(pedido.productos).map((producto: any) => {
          return {
            codigo: producto.codigo || 'N/A', // Asegurarse de que el campo código siempre exista
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            precio: producto.precio
          };
        });
        return pedido;
      });
      console.log('Pedidos aprobados fetched:', this.pedidosAprobados);
    }, error => {
      console.error('Error fetching pedidos aprobados:', error);
    });
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
      console.log('Confirm Ok', data);
      // Llamar a la función para aprobar el pedido con los datos
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


  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
