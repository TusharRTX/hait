import { Component } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

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
  isMenuVisible = false;
  categories: any[] = [];
  selectedCategory: string;

  constructor(private djangoApi: DjangoapiService, private navCtrl: NavController) {
    this.selectedCategory = '';
  }

  ngOnInit(){
    // this.cargaProductos()
    this.loadCategories();
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }

  register() {
    this.navCtrl.navigateForward('/registro');
  }

//   cargaProductos(){
//     this.djangoApi.getProducto().subscribe(
//       (res)=>{
//        console.log(res);
//        this.categories = this.groupByCategory(res);
//      }
//      ,
//      (error)=>{
//         console.log(error);
//      }
//    )
//  }

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
