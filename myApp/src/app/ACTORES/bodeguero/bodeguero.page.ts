import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodeguero',
  templateUrl: './bodeguero.page.html',
  styleUrls: ['./bodeguero.page.scss'],
})
export class BodegueroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAPedidosAprobados() {
    this.router.navigate(['/pedidobodeguero']);
  }

  irAPedidosEstado() {
    this.router.navigate(['/pedidoestado']);
  }

}
