import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {
  isMenuVisible = false;
  productoData: any = {
    codigo: '',
    categoria: '',
    marca: '',
    nombre: '',
    precio: ''
  };
  selectedFile: File | null = null;

  constructor(private djangoApi: DjangoapiService, private navCtrl: NavController) { }

  ngOnInit() {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
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


