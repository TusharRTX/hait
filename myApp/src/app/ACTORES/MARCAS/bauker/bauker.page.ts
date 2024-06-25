import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../../../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-bauker',
  templateUrl: './bauker.page.html',
  styleUrls: ['./bauker.page.scss'],
})
export class baukerPage implements OnInit {
  products: any[] = [];
  marca: string = 'BAUKER';
  categories: any[] = [];
  selectedCategory: string = '';


  isDropdownOpen = false;

  constructor(private route: ActivatedRoute, private djangoApi: DjangoapiService, private popoverController: PopoverController,private cartService: CartService,
    private toastController: ToastController) {}

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

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.getElementById('products-category-button');
    if (dropdown && button) {
      if (open) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`; // adjust positioning
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showToast();
  }
  
  async showToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }


}

