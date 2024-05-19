import { Component } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { MenuController } from '@ionic/angular';


interface Product {
  codigo: string;
  categoria: string;
  marca: string;
  nombre: string;
  precio: number;
  url_imagen: string;
}

interface Category {
  name: string;
  products: Product[];
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  categories: any[] = [];
  selectedCategory: string;

  constructor(private djangoApi: DjangoapiService,private menu: MenuController) {
    this.selectedCategory = '';
  }

  ngOnInit(){
    this.loadCategories();
  }

  openCategoriesMenu() {
    this.menu.open('first');
  }

 loadCategories() {
  this.djangoApi.getCategories().subscribe(
    (data: string[]) => {
      this.categories = data;
    },
    error => console.error('Error fetching categories:', error)
  );
}

 groupByCategory(products: Product[]): Category[] {
  const categoryMap: { [key: string]: Category } = {}; 

  products.forEach((product) => {
    if (!categoryMap[product.categoria]) {
      categoryMap[product.categoria] = { name: product.categoria, products: [] };
    }
    categoryMap[product.categoria].products.push(product);
  });

  return Object.values(categoryMap); 
}

 filterByCategory() {
  console.log('Selected Category:', this.selectedCategory);
 }


}
