import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  username: string = '';
  password: string = '';

  isMenuVisible = false;

  constructor(private router: Router,private djangoapiService: DjangoapiService) { }

  ngOnInit() {
  }

  async login() {
    const data = {
      username: this.username,
      password: this.password,
    };
    const response = await this.djangoapiService.login(data);
    this.router.navigate(['/home']);
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
