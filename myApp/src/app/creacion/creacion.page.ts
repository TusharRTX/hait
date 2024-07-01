import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {
  isAuthenticated: boolean = false;
  role: string = '';
  isDropdownOpen = false;
  productoData: any = {
    codigo: '',
    categoria: '',
    marca: '',
    nombre: '',
    precio: '',
    stock_online: 0,
    stock_tienda: 0,
  };
  selectedFile: File | null = null;

  constructor(private alertController: AlertController,private router: Router,private djangoApi: DjangoapiService, private navCtrl: NavController) { }

  ngOnInit() {

    this.djangoApi.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.djangoApi.role$.subscribe(role => {
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
            await this.djangoApi.logout();
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  crearProducto() {
    if (this.selectedFile) {
      this.djangoApi.crearProducto(this.productoData, this.selectedFile).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}


