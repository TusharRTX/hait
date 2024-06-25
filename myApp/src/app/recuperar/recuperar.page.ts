import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usernameOrEmail: string = '';
  newPassword: string = '';

  constructor(private djangoapiService: DjangoapiService, private router: Router) { }

  ngOnInit() {
  }

  async resetPassword() {
    const data = {
      username: this.usernameOrEmail,
      email: this.usernameOrEmail,
      new_password: this.newPassword,
    };
    await this.djangoapiService.resetPassword(data);
    this.router.navigate(['/iniciosesion']);
  }

}
