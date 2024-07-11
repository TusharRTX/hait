import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  selectedDate: string = '';
  vouchers: any[] = [];

  constructor(private apiService: DjangoapiService) { }

  ngOnInit() { }

  fetchVouchers() {
    if (this.selectedDate) {
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0]; // Formatea la fecha a YYYY-MM-DD
      this.apiService.getVouchers(formattedDate).subscribe(
        response => {
          this.vouchers = response;
        },
        error => {
          console.error('Error fetching vouchers:', error);
        }
      );
    }
  }
  
}

