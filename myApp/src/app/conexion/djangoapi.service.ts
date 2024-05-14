import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})

export class DjangoapiService {
  getNombreDeCorreo(duenno: any) {
    throw new Error('Method not implemented.');
  }
  apiURL = 'https://mjz9373v-8000.brs.devtunnels.ms/api';
  
  constructor(private http: HttpClient) { }

  getUser():Observable<any>{
    return this.http.get(this.apiURL+'/lista_user')
    .pipe(retry(3));
  }
  
  getViaje():Observable<any>{
    return this.http.get(this.apiURL+'/lista_viaje')
    .pipe(retry(3));
  }

  crearviaje(viajeData: any): Observable<any> {
    return this.http.post(this.apiURL + '/lista_viaje', viajeData);
  }

  seleccionarViaje(viajeId: any): Observable<any> {
    const body = { viajeId };
    return this.http.post(this.apiURL + '/descontar', body);
  }
  public sumar(x:number, y:number):number{
    return x+y;
  }


  


}
