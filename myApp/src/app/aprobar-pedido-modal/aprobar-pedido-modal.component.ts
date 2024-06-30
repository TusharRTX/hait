import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aprobar-pedido-modal',
  templateUrl: './aprobar-pedido-modal.component.html',
  styleUrls: ['./aprobar-pedido-modal.component.scss'],
})
export class AprobarPedidoModalComponent {
  @Input() nota_bodeguero: string = '';
  @Input() estado: string = '';

  estados = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'aprobado', label: 'Aprobado' },
    { value: 'preparado', label: 'Preparado' },
    { value: 'despachado', label: 'Despachado' },
    { value: 'listo_retiro', label: 'Listo para Retiro' },
  ];

  constructor(private modalController: ModalController) { }

  async aceptar() {
    await this.modalController.dismiss({
      nota_bodeguero: this.nota_bodeguero,
      estado: this.estado
    });
  }

  async cancelar() {
    await this.modalController.dismiss();
  }
}

