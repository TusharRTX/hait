import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  
  products: any[] = [];
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(
    private apiService: DjangoapiService,
    private navCtrl: NavController,
    private cartService: CartService,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    const categoryId = 1; 
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
      color: color
    });
    toast.present();
  }
  
}





