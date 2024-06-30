import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editarestado',
  templateUrl: './editarestado.component.html',
  styleUrls: ['./editarestado.component.scss']
})
export class EditarestadoComponent implements OnInit {
  @Input() pedido: any;
  @Output() estadoActualizado = new EventEmitter<any>();
  form: FormGroup;
  estados = ['pendiente', 'aprobado', 'preparado', 'despachado', 'listo_retiro'];



  constructor(
    private fb: FormBuilder,
    private djangoApiService: DjangoapiService,
    private modalController: ModalController
  ) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      nota_bodeguero: ['']
    });
  }

  ngOnInit() {
    if (this.pedido) {
      this.form.patchValue({
        estado: this.pedido.estado,
        nota_bodeguero: this.pedido.nota_bodeguero
      });
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.djangoApiService.updateEstadoPedido(this.pedido.id, this.form.value).subscribe(
        (response) => {
          this.estadoActualizado.emit(response);
          this.closeModal(response);
        },
        (error) => {
          console.error('Error actualizando el estado', error);
        }
      );
    }
  }

  async closeModal(data: any = null) {
    await this.modalController.dismiss(data);
  }
}





