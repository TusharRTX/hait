import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { Storage } from '@ionic/storage';
import { AutenticacionService } from '../autenticacion.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
  credentials = {
    username: "",
    password: ""
  }
  hide = true;
  usuarios : any[] = [];
  users: any = [];
  loginerror: boolean = false;
  error: boolean = false;
  errorrol: any = [];
  public mensaje: string = "";
  public entrada = {
    numero1: 0,
    numero2: 0
  };
  recordarCredenciales = false;


  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;

  
  segment: string = 'login';


  private animation!:Animation;
  constructor(private router: Router,private http: HttpClient,private animationCtrl:AnimationController,private djangoApi: DjangoapiService) { 
  }
  ngOnInit(){
    if (this.djangoApi) {
      this.cargaUsuarios();
    }
    const recordarCredenciales = localStorage.getItem('recordarCredenciales');
    this.recordarCredenciales = recordarCredenciales === 'true';
  
    if (this.recordarCredenciales) {
      this.credentials.username = localStorage.getItem('username') || '';
      this.credentials.password = localStorage.getItem('password') || '';
    } else {
      this.credentials.username = '';
      this.credentials.password = '';
    }
  }
  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
      .addElement(this.avatar.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        {offset:0, transform:'translateX(0px)',opacity:'1'},
        {offset:0.25, transform:'translateX(100px)',opacity:'0.2'},
        {offset:0.50, transform:'translateX(0px)',opacity:'1'},
        {offset:0.75, transform:'translateX(-100px)',opacity:'0.2'},
        {offset:1, transform:'translateX(0px)',opacity:'1'},
      ])
    this.animation.play();
  }

  ionViewWillEnter() {
    this.loginerror = false;
  }
  
  home(){
    return this.http.get("https://mjz9373v-8000.brs.devtunnels.ms/api/lista_usuarios/").subscribe(
      data=>{
        console.log(data)
      }
    )
  }


  cargaUsuarios(){
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

  entrar() {
    if (this.credentials.username == "" || this.credentials.password == "") {
      this.loginerror = false;
      this.error = false;
      console.log("vacio");
    } else if (this.usuarios.length > 0) {
      let usuarioAutenticado = false;

      for (const usuario of this.usuarios) {
        if (
          usuario.user === this.credentials.username &&
          usuario.password === this.credentials.password
        ) {
          usuarioAutenticado = true;

          if (usuario.rol === 'conductor' || usuario.rol === 'pasajero') {
            this.autenticarUsuario(usuario.rol);
          } else {
            console.log("Error: Rol de usuario no reconocido");
          }

          break;
        }
      }

      if (!usuarioAutenticado) {
        this.loginerror = true;
        this.error = false;
        console.log("Información ingresada incorrecta");
      }
    } else {
      this.loginerror = false;
      this.error = true;
      console.log("No hay usuarios registrados");
    }
  }

  autenticarUsuario(rol: string) {
    if (this.recordarCredenciales) {
      localStorage.setItem('recordarCredenciales', 'true');
      localStorage.setItem('username', this.credentials.username);
      localStorage.setItem('password', this.credentials.password);
    } else {
      localStorage.removeItem('recordarCredenciales');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  
    localStorage.setItem('ingresado', 'true');
    let navegationExtras: NavigationExtras = {
      state: {
        credentials: this.credentials,
      },
    };

    if (rol === 'conductor') {
      this.router.navigate(['/bienvenida'], navegationExtras);
      console.log("Usuario conductor autenticado correctamente");
    } else if (rol === 'pasajero') {
      this.router.navigate(['/pass'], navegationExtras);
      console.log("Usuario pasajero autenticado correctamente");
    }
  }


  doSumar(){
    this.mensaje= "La suma es: " + 
      this.djangoApi.sumar(
        Number(this.entrada.numero1),
        Number(this.entrada.numero2));
  }
}
