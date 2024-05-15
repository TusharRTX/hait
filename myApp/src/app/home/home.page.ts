import { Component } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

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

  constructor(private djangoApi: DjangoapiService) {
    this.selectedCategory = '';
  }

  ngOnInit(){
    // this.cargaProductos()
    this.loadCategories();
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
  const categoryMap: { [key: string]: Category } = {}; // Correctly typed as a dictionary

  products.forEach((product) => {
    if (!categoryMap[product.categoria]) {
      categoryMap[product.categoria] = { name: product.categoria, products: [] };
    }
    categoryMap[product.categoria].products.push(product);
  });

  return Object.values(categoryMap); // Convert dictionary to array
}

filterByCategory() {
  // Logic to filter or refresh products based on selected category
  console.log('Selected Category:', this.selectedCategory);
}


 

}
