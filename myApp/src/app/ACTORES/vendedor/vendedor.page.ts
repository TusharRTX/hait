import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.page.html',
  styleUrls: ['./vendedor.page.scss'],
})
export class VendedorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAProductos() {
    this.router.navigate(['/todoproductos']);
  }

  irAPedidos() {
    this.router.navigate(['/pedidos']);
  }
}
