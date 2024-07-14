import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { ToastController } from '@ionic/angular';
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

  constructor(private toastController: ToastController,private alertController: AlertController,private djangoapiService: DjangoapiService, private router: Router) { }

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
        dropdown.style.top = `${rect.bottom}px`; 
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
      this.showToast('Contraseña actualizada correctamente', 'success');
    } catch (error) {
      this.showToast('Error al actualizar la contraseña, revisar nombre de usuario', 'danger');
      console.error('Error resetting password:', error);
    }
  }
  
  async showToast(message: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    toast.color = color;
    document.body.appendChild(toast);
    await toast.present();
  }

}
