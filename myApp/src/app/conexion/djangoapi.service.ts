import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DjangoapiService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private roleSubject = new BehaviorSubject<string>('');
  public role$ = this.roleSubject.asObservable();
  public userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  apiURL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, public storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const token = await this.storage.get('token');
    this.isAuthenticatedSubject.next(!!token);
    if (token) {
      const role = await this.storage.get('rol');
      this.roleSubject.next(role);
      const user = await this.storage.get('user');
      this.userSubject.next(user);
    }
  }

  getPedidos(): Observable<any> {
    console.log('Fetching pedidos...');
    return this.http.get(`${this.apiURL}/get_pedidos/`);
  }

  getUser(): Observable<any> {
    return this.http.get(this.apiURL + '/lista_user')
      .pipe(retry(3));
  }

  getProducto(): Observable<any> {
    return this.http.get(this.apiURL + '/creacion').pipe(retry(3));
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
    return this.http.get(this.apiURL + '/categorias').pipe(retry(3));
  }

  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/getexchangerate').pipe(retry(3));
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(this.apiURL + `/productos_por_categoria/${categoryId}/`).pipe(retry(3));
  }

  getProductosPorMarca(marca: string): Observable<any> {
    return this.http.get(`${this.apiURL}/productos_por_marca/${marca}/`).pipe(retry(3));
  }

  async register(data: any) {
    try {
        const response = await this.http.post(`${this.apiURL}/register/`, data).toPromise();
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
  }

  async login(data: any) {
    const response = await axios.post(`${this.apiURL}/login/`, data);
    await this.storage.set('token', response.data.token);
    await this.storage.set('rol', response.data.rol);
    await this.storage.set('user_id', response.data.user_id);
    await this.storage.set('user', { 
      id: response.data.user_id,
      nombre: response.data.nombre,
      apellido: response.data.apellido 
    });
    this.isAuthenticatedSubject.next(true);
    this.roleSubject.next(response.data.rol);
    this.userSubject.next({
      id: response.data.user_id,
      nombre: response.data.nombre,
      apellido: response.data.apellido
    });
    return response.data;
  }

  async getUserDetails() {
    const token = await this.storage.get('token');
    const response = await axios.get(`${this.apiURL}/user/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  }

  async resetPassword(data: any) {
    const response = await axios.post(`${this.apiURL}/reset-password/`, data);
    return response.data;
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('rol');
    await this.storage.remove('user_id');
    await this.storage.remove('user');
    this.isAuthenticatedSubject.next(false);
    this.roleSubject.next('');
  }

  getUserId(): Promise<number> {
    return this.storage.get('user_id');
  }

  registerPurchase(purchaseData: any): Promise<any> {
    return axios.post(`${this.apiURL}/registrar_compra/`, purchaseData)
      .then(response => response.data);
  }

  getProductosDisponibles(): Observable<any> {
    return this.http.get(`${this.apiURL}/productos_disponibles/`);
  }

  updateProducto(id: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiURL}/api/productos/${id}/`, productData);
  }

  aprobarPedido(id: number): Observable<any> {
    return this.http.post(`${this.apiURL}/aprobar_pedido/${id}/`, {});
  }
  
  rechazarPedido(id: number): Observable<any> {
    return this.http.post(`${this.apiURL}/rechazar_pedido/${id}/`, {});
  }

  getPedidosAprobados(): Observable<any> {
    return this.http.get(`${this.apiURL}/get_pedidos_aprobados/`);
  }

  aprobarPedidoBodeguero(id: number, estado: string, nota_bodeguero: string): Observable<any> {
    return this.http.post(`${this.apiURL}/aprobar_pedido_bodeguero/${id}/`, { estado, nota_bodeguero });
}

  getDetallesConEstado(): Observable<any> {
    return this.http.get(`${this.apiURL}/api/detalles_con_estado/`);
  }

  guardarPedidoFinal(pedidoFinal: any): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar_pedido_final/`, pedidoFinal);
  }
  
  updateEstadoPedido(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/api/update_estado_pedido/${id}/`, data);
  }

  marcarComoEnviado(id: number): Observable<any> {
    return this.http.post(`${this.apiURL}/marcar_como_enviado/${id}/`, {});
  }

  generateVoucher(voucherData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/generate_voucher/`, voucherData);
  }

  getVoucher(voucherId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/voucher/${voucherId}/`);
  }

  getVouchers(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/vouchers/?date=${date}`);
  }  

  actualizarStock(items: any[], stockSource: string): Observable<any> {
    const data = {
      items: items,
      stock_source: stockSource
    };
  
    return this.http.post(`${this.apiURL}/actualizar_stock/`, data);
  }

}



  





  

  






