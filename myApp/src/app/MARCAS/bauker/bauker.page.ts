import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  


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
  isAuthenticated: boolean = false;
  role: string = '';


  isDropdownOpen = false;

  constructor(private alertController: AlertController,private router: Router,private route: ActivatedRoute, private djangoApi: DjangoapiService, private popoverController: PopoverController,private cartService: CartService,
    private toastController: ToastController) {}

  ngOnInit() {
    this.loadProducts();

    this.djangoApi.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApi.role$.subscribe(role => {
      this.role = role;
    });
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: async () => {
            await this.djangoApi.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
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
    const added = this.cartService.addToCart(product);
    if (added) {
      this.showToast('Producto agregado al carrito', 'success');
    } else {
      this.showToast('No hay suficiente stock online', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }


}

