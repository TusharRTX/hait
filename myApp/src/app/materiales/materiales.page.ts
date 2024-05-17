import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.scss'],
})
export class MaterialesPage implements OnInit {
  

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
