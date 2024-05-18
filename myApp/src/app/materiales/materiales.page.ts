import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.scss'],
})
export class MaterialesPage implements OnInit {
  products: any[] = [];

  constructor(private apiService: DjangoapiService, private navCtrl: NavController) { }

  ngOnInit() {
    const categoryId = 1; // ID de la categoría "equipo"
    this.apiService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }
  

  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }

  register() {
    this.navCtrl.navigateForward('/registro');
  }

}
