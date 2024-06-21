import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories: any[] = [];
  selectedCategory: string = '';
  products: any[] = [];
  isDropdownOpen = false;

  constructor(private route: ActivatedRoute,private djangoApi: DjangoapiService) {}

  ngOnInit() {
    this.loadCategories();
  }


  loadCategories() {
    this.djangoApi.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      error => console.error('Error fetching categories:', error)
    );
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.djangoApi.getProductsByCategory(this.getCategoryIdByName(category)).subscribe(
      (data: any[]) => {
        this.products = data;
      },
      error => console.error('Error fetching products by category:', error)
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
}


