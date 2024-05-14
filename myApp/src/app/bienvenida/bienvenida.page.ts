import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage {

  viajeData: any = {
    patente: "",
    hora: "",
    costo: "",
    capacidad: "",
    destino: "",
    duenno: "",
    correo: "",
    url_imagen: ""
  }

  state: any;
  credentials: any;
  viajes: any = [];
  loginerror: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router ,
    private djangoApi: DjangoapiService){
      this.activatedRoute.queryParams.subscribe(params => {
        this.state = this.router.getCurrentNavigation()?.extras.state;
        this.credentials = this.state.credentials
        console.log(this.credentials);
      });
  }

  register() {
    this.djangoApi.crearviaje(this.viajeData).subscribe(
      (response) => {
        
        console.log('Registro exitoso:', response);
      },
      (error) => {
        
        console.error('Error en el registro:', error);
      }
    );
  }

  logout(){
    localStorage.removeItem('ingresado');
    this.router.navigate(['/home']); 
  }

  register1() {
    this.register();
    this.loginerror = true;
  }

}

