import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';

import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usernameOrEmail: string = '';
  newPassword: string = '';
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = ''

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

  async resetPassword() {
    const data = {
      username_or_email: this.usernameOrEmail,
      new_password: this.newPassword,
    };
    try {
      await this.djangoapiService.resetPassword(data);
      this.router.navigate(['/iniciosesion']);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }

}
