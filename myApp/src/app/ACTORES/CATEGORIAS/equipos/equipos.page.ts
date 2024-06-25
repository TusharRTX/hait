import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../../../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';
import { CartService } from '../../../services/cart.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  
  products: any[] = [];
  isDropdownOpen = false;

  constructor(
    private apiService: DjangoapiService,
    private navCtrl: NavController,
    private cartService: CartService,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private alertController: AlertController, 
    private router: Router

  ) { }

  ngOnInit() {
    const categoryId = 1; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
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
          cssClass: 'secondary'
        }, {
          text: 'Sí',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.router.navigate(['/home']); 
  }
  home() {
    this.router.navigate(['/ACTORES/VENDEDOR/home']); 
  }
  carrito() {
    this.router.navigate(['/ACTORES/cart']); 
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





