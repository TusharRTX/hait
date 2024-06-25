import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../../../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-vinilit',
  templateUrl: './vinilit.page.html',
  styleUrls: ['./vinilit.page.scss'],
})
export class vinilitPage implements OnInit {
  products: any[] = [];
  marca: string = 'VINILIT';
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
        dropdown.style.top = `${rect.bottom}px`; // adjust positioning
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

