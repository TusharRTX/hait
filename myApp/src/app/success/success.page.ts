import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  items: any[] = [];
  total: number = 0;

  constructor(private menu: MenuController,private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }
  openCategoriesMenu() {
    this.menu.open('first');
  }
  
}

