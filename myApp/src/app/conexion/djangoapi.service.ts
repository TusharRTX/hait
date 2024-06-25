import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DjangoapiService {

  apiURL = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient, public storage: Storage) { this.init(); }

  async init() {
    await this.storage.create();
  }

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


  // getProductosPorCategoria(categoriaId: number): Observable<any> {
  //   return this.http.get(`${this.apiURL}/productos_por_categoria/${categoriaId}`)
  //     .pipe(retry(3));
  // }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(this.apiURL + `/productos_por_categoria/${categoryId}/`).pipe(retry(3));
  }

  getProductosPorMarca(marca: string): Observable<any> {
    return this.http.get(`${this.apiURL}/productos_por_marca/${marca}/`)
      .pipe(retry(3));
  }

  ////////////////////////////

  async register(data: any) {
    const response = await axios.post(`${this.apiURL}/register/`, data);
    return response.data;
  }

  // Inicio de sesión
  async login(data: any) {
    const response = await axios.post(`${this.apiURL}/login/`, data);
    await this.storage.set('token', response.data.token);
    await this.storage.set('rol', response.data.rol);
    return response.data;
  }

  // Obtener detalles del usuario
  async getUserDetails() {
    const token = await this.storage.get('token');
    const response = await axios.get(`${this.apiURL}/user/`, {
      headers: { 'Authorization': `Token ${token}` }
    });
    return response.data;
  }

  // Restablecer contraseña
  async resetPassword(data: any) {
    const response = await axios.post(`${this.apiURL}/reset-password/`, data);
    return response.data;
  }
  
  // Cerrar sesión
  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('rol');
  }
  
}
  





  

  






