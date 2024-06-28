import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todoproductos',
  templateUrl: './todoproductos.page.html',
  styleUrls: ['./todoproductos.page.scss'],
})
export class TodoproductosPage implements OnInit {
  productos: any[] = [];
  productosPaginados: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private apiService: DjangoapiService,
    private cartService: CartService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.apiService.getProductosDisponibles().subscribe(data => {
      this.productos = data;
      this.totalPages = Math.ceil(this.productos.length / this.itemsPerPage);
      this.updatePaginatedProducts();
    });

    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.productosPaginados = this.productos.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
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
            await this.apiService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.getElementById('products-category-button');
    if (dropdown && button) {
      if (open) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
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
      color: color,
    });
    toast.present();
  }

  openCategoriesMenu() {
    this.menu.open('first');
  }
  
}


