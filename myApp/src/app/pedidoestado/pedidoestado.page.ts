import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-pedidoestado',
  templateUrl: './pedidoestado.page.html',
  styleUrls: ['./pedidoestado.page.scss'],
})
export class PedidoestadoPage implements OnInit {
  detallesConEstado: any[] = [];

  constructor(private djangoApi: DjangoapiService) { }

  ngOnInit() {
    this.djangoApi.getDetallesConEstado().subscribe(data => {
      this.detallesConEstado = data.map((item: any) => {
        item.productos = JSON.parse(item.productos);
        return item;
      });
      console.log(this.detallesConEstado);
    });
  }
}



