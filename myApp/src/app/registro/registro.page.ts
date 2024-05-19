import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  isMenuVisible = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }


}
