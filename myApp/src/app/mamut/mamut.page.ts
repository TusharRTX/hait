import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mamut',
  templateUrl: './mamut.page.html',
  styleUrls: ['./mamut.page.scss'],
})
export class MAMUTPage implements OnInit {
  products: any[] = [];
  marca: string = 'MAMUT';

  constructor(private djangoApi: DjangoapiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.djangoApi.getProductosPorMarca(this.marca).subscribe(
      (data: any[]) => {
        this.products = data;
      },
      error => console.error('Error fetching products by brand:', error)
    );
  }
}

