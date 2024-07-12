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

  constructor(private apiService: DjangoapiService) {}

  ngOnInit() {
    this.selectedDate = new Date().toISOString().split('T')[0]; // Set default to today's date
    this.fetchVouchers();
  }

  fetchVouchers() {
    if (this.selectedDate) {
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0]; // Formatea la fecha a YYYY-MM-DD
      this.apiService.getVouchers(formattedDate).subscribe(
        response => {
          this.vouchers = response;
          this.vouchers.forEach(voucher => {
            if (voucher.enviado_info && voucher.enviado_info.enviado) {
              voucher.enviado_info.enviado_at_formatted = this.formatDate(voucher.enviado_info.enviado_at);
            }
          });
        },
        error => {
          console.error('Error fetching vouchers:', error);
        }
      );
    }
  }

  enviarCorreo(voucher: any) {
    this.apiService.markVoucherAsSent(voucher.voucher_id).subscribe(
      response => {
        voucher.enviado_info.enviado = true;
        voucher.enviado_info.enviado_at = response.enviado_at; // Actualiza la fecha de envío con la respuesta de la API
        voucher.enviado_info.enviado_at_formatted = this.formatDate(response.enviado_at);
        console.log('Voucher marcado como enviado:', response);
      },
      error => {
        console.error('Error marking voucher as sent:', error);
      }
    );
  }

  private formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
}







  



