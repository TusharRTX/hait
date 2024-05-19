import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  isMenuVisible = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
