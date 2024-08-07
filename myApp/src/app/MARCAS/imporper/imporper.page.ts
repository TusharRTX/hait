import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  


@Component({
  selector: 'app-imporper',
  templateUrl: './imporper.page.html',
  styleUrls: ['./imporper.page.scss'],
})
export class imporperPage implements OnInit {
  products: any[] = [];
  marca: string = 'IMPORPER';
  categories: any[] = [];
  selectedCategory: string = '';
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';


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

  getCategoryIdByName(categoryName: string): number {
    const category = this.categories.find(cat => cat.nombre === categoryName);
    return category ? category.id : 0;
  }

  scrollToCategory(category: string) {
    this.selectedCategory = category;
    this.djangoApi.getProductsByCategory(this.getCategoryIdByName(category)).subscribe(
      (data: any[]) => {
        this.products = data;
        setTimeout(() => {
          const element = document.getElementById(category);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error(`Element with id ${category} not found`);
          }
        }, 100); // delay to ensure the products are rendered
      },
      error => console.error('Error fetching products by category:', error)
    );
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

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.toggleDropdown(false);
    } else {
      console.error(`Element with id ${section} not found`);
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

