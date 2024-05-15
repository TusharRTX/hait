import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class DjangoapiService {

  apiURL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getUser():Observable<any>{
    return this.http.get(this.apiURL+'/lista_user')
    .pipe(retry(3));
  }

  getProducto():Observable<any>{
    return this.http.get(this.apiURL+'/creacion')
    .pipe(retry(3));
  }

  crearProducto(productoData: any): Observable<any> {
    return this.http.post(this.apiURL + '/creacion', productoData);
  }

  getCategories():Observable<any>{
    return this.http.get(this.apiURL+'/categorias')
    .pipe(retry(3));
  }

}
