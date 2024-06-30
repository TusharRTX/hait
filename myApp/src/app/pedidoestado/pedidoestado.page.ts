import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedidoestado',
  templateUrl: './pedidoestado.page.html',
  styleUrls: ['./pedidoestado.page.scss'],
})
export class PedidoestadoPage implements OnInit {
  pedidoId: number = 0;  // Proporciona un valor predeterminado
  estadoPedido: any = {
    estado: '',
    nota_bodeguero: ''
  };

  constructor(
    private route: ActivatedRoute,
    private djangoApiService: DjangoapiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.pedidoId = +this.route.snapshot.paramMap.get('id')!;  // Usa el operador '!' para indicar que confías en que el valor no será null
    this.fetchEstadoPedido();
  }

  fetchEstadoPedido() {
    this.djangoApiService.getEstadoPedido(this.pedidoId).subscribe(
      data => {
        this.estadoPedido = data;
      },
      error => {
        console.error('Error fetching estado pedido:', error);
      }
    );
  }

  guardarEstadoPedido() {
    this.djangoApiService.editarEstadoPedido(this.pedidoId, this.estadoPedido).subscribe(response => {
      this.showToast('Estado del pedido actualizado', 'success');
    }, error => {
      this.showToast('Error al actualizar el estado del pedido', 'danger');
      console.error('Error al actualizar el estado del pedido:', error);
    });
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

