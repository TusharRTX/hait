import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { AlertController } from '@ionic/angular';  
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  username: string = '';
  password: string = '';
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';

  constructor( private alertController: AlertController,private router: Router,private djangoapiService: DjangoapiService, private toastController: ToastController) { }

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

  async login() {
    const data = {
      username: this.username,
      password: this.password,
    };
    
    try {
      const response = await this.djangoapiService.login(data);
      this.router.navigate(['/home']);
      this.showToast('Sesión iniciada correctamente', 'success');
    } catch (error) {
      this.showToast('Error al iniciar sesión, revisar credenciales', 'danger');
      console.error('Error during login:', error);
    }
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

  forgotPassword() {
    
    this.router.navigate(['/recuperar']);
  }

  createAccount() {
    this.router.navigate(['/registro']);
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
