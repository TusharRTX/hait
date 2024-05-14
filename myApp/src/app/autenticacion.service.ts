import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  autenticado:boolean=false;

  constructor() {

  }
  
  Autenticacion(valor: boolean){
    if(valor){
      this.autenticado=true;
    }else{
      this.autenticado=false;
    }
}

returnVal(){
  return this.autenticado
}
}