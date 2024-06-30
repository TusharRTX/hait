import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-pedidosokbodeguero',
  templateUrl: './pedidosokbodeguero.page.html',
  styleUrls: ['./pedidosokbodeguero.page.scss'],
})
export class PedidosokbodegueroPage implements OnInit {

  pedidosVendedor: any[] = [];

  constructor(private djangoApiService: DjangoapiService) { }

  ngOnInit() {
  //   this.loadPedidosVendedor();
  // }

  // loadPedidosVendedor() {
  //   this.djangoApiService.getPedidosVendedor().subscribe((data) => {
  //     this.pedidosVendedor = data.map((item: any) => {
  //       item.productos = JSON.parse(item.productos);
  //       return item;
  //     });
  //     console.log(this.pedidosVendedor);
  //   });
  // }

}

}
