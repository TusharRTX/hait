import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

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
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor(private alertController: AlertController,private djangoapiService: DjangoapiService, private router: Router) { }

  ngOnInit() {

    this.djangoapiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoapiService.role$.subscribe(role => {
      this.role = role;
    });
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: async () => {
            await this.djangoapiService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.getElementById('products-category-button');
    if (dropdown && button) {
      if (open) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`; // adjust positioning
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
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


}
