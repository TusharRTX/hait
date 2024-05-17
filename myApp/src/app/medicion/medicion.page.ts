import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {
  

  constructor(private djangoApi: DjangoapiService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  login() {
    this.navCtrl.navigateForward('/iniciosesion');
  }

  register() {
    this.navCtrl.navigateForward('/registro');
  }

}
