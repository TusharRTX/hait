import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  direccion: string = '';
  rut: string = '';
  telefono: string = '';
  isMenuVisible = false;

  constructor(private djangoapiService: DjangoapiService, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    const data = {
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      direccion: this.direccion,
      rut: this.rut,
      telefono: this.telefono,
    };
    await this.djangoapiService.register(data);
    this.router.navigate(['/iniciosesion']);
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }


}
