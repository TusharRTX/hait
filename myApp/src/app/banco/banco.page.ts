import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.page.html',
  styleUrls: ['./banco.page.scss'],
})
export class BancoPage implements OnInit {
  exchangeRateData: any;

  constructor(private djangoApi: DjangoapiService) {}
  
    ngOnInit() {
      this.djangoApi.getExchangeRate().subscribe(data => {
        this.exchangeRateData = data;
      });
    }
  }
  
  
  

