import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-tornillos',
  templateUrl: './tornillos.page.html',
  styleUrls: ['./tornillos.page.scss'],
})
export class TornillosPage implements OnInit {
  products: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController,private apiService: DjangoapiService, private cartService: CartService,private menu: MenuController) { }

  ngOnInit() {
    const categoryId = 4; 
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });

    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.apiService.role$.subscribe(role => {
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
            await this.apiService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
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
  
  openCategoriesMenu() {
    this.menu.open('first');
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

}
