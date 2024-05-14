import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  viaje: any[] = [];
  usuarios: any;

  constructor(private djangoApi: DjangoapiService, private router: Router) { }

  ngOnInit(){
    this.cargaViaje()
  }

   cargaViaje(){
     this.djangoApi.getViaje().subscribe(
       (res)=>{
        console.log(res);
         this.viaje = res;
      }
      ,
      (error)=>{
         console.log(error);
      }
    )
  }

  correoql(){
    this.djangoApi.getUser().subscribe(
      (res)=>{
       console.log(res);
        this.usuarios = res;
     }
     ,
     (error)=>{
        console.log(error);
     }
   )
 }

  async seleccionarViajeYEnviarCorreo(item: any) {
    try {
      const cuerpo = `
      Buenas tardes cliente,

      Usted ha seleccionado el viaje con la siguiente información:

      PATENTE: ${item.patente}
      HORA: ${item.hora} hrs
      COSTO: $${item.costo}
      PASAJEROS: ${item.capacidad}
      DESTINO: ${item.destino}
      DUEÑO: ${item.duenno}

      Gracias por elegir nuestro servicio. ¡Esperamos que tenga un excelente viaje!

      Atentamente,
      Tellevoapp
        `;

      // Construir el enlace mailto
      const asunto = 'Confirmación Viaje';
      const enlaceMailto = `mailto:${item.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      window.location.href = enlaceMailto;
    } catch (error) {
      console.error('Error al obtener el nombre de correo', error);
    }
  }

  descontar(item: any) {
    const viajeId = item.id;
    this.djangoApi.seleccionarViaje(viajeId)
      .subscribe(response => {
        console.log('Viaje seleccionado correctamente', response);
      });
  }
  

  logout(){
    localStorage.removeItem('ingresado');
    this.router.navigate(['/home']); 
  }
  
}



