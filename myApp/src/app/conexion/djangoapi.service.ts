import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class DjangoapiService {

  apiURL = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.apiURL + '/lista_user')
      .pipe(retry(3));
  }

  getProducto(): Observable<any> {
    return this.http.get(this.apiURL + '/creacion')
      .pipe(retry(3));
  }
  crearProducto(productoData: any, imagen: File): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in productoData) {
      if (productoData.hasOwnProperty(key)) {
        formData.append(key, productoData[key]);
      }
    }
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(this.apiURL + '/creacion', formData);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiURL + '/categorias')
      .pipe(retry(3));
  }


  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/getexchangerate')
     .pipe(retry(3));
  }


  getProductosPorCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/productos_por_categoria/${categoriaId}`)
      .pipe(retry(3));
  }


  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(this.apiURL + `/productos_por_categoria/${categoryId}/`).pipe(retry(3));
  }
  
}




  

  






