import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  // apiURL = 'http://127.0.0.1:8000/api';
  apiURL = 'https://8f68b14p-8000.brs.devtunnels.ms/api';

  constructor(private http: HttpClient) { }

  createPaymentPreference(items: any[], stockSource: string): Observable<any> {
    return this.http.post(`${this.apiURL}/create_payment_preference/`, {items, stock_source: stockSource})
  }

}