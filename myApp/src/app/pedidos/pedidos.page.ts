import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: any[] = [];

  constructor(private djangoApiService: DjangoapiService) {}

  ngOnInit() {
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
}

