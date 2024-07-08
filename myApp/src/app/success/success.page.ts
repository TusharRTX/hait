import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { jsPDF } from 'jspdf';  // Asegúrate de tener esta importación

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  items: any[] = [];
  total: number = 0;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  userId: number;
  deliveryMethod: string = '';
  voucherId: number;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private apiService: DjangoapiService,
    private cartService: CartService
  ) {
    this.userId = 0;  
    this.voucherId = 0;  
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Obtener el voucherId del local storage
      const storedVoucherId = localStorage.getItem('voucherId');
      this.voucherId = storedVoucherId ? parseInt(storedVoucherId, 10) : 0;
      if (this.voucherId) {
        this.LoadVoucher();
      } else {
        console.error('No voucherId found');
      }
    });

    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.clearCart();
    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
    this.apiService.getUserId().then(id => {
      this.userId = id;
    });
    this.showDeliveryMethodAlert();
  }

  LoadVoucher() {
    this.apiService.getVoucher(this.voucherId).subscribe(
      response => {
        console.log('Voucher loaded:', response);
      },
      error => {
        console.error('Failed to load voucher:', error);
      }
    );
  }

  downloadVoucher() {
    this.apiService.getVoucher(this.voucherId).subscribe(voucher => {
      const doc = new jsPDF();
  
      doc.setFontSize(20);
      doc.text('Comprobante de Venta', 10, 20);
      doc.setFontSize(12);
      doc.text(`Voucher ID: ${voucher.voucher_id}`, 10, 30);
      doc.text(`Voucher Emitido por: ${voucher.user.nombre} ${voucher.user.apellido}`, 10, 40);
      doc.text('------------------------------', 10, 50);
  
      voucher.items.forEach((item: any, index: number) => {
        doc.text(`${item.title}  Cantidad: ${item.quantity}  Precio Unitario: ${item.unit_price}`, 10, 60 + index * 10);
      });
  
      doc.text('------------------------------', 10, 60 + voucher.items.length * 10);
      doc.text(`Total: ${voucher.total}`, 10, 70 + voucher.items.length * 10);
  
      doc.save('voucher.pdf');
    });
  }
  
  

  async showDeliveryMethodAlert() {
    const alert = await this.alertController.create({
      header: 'Método de Entrega',
      message: 'Por favor selecciona el método de entrega',
      inputs: [
        {
          name: 'deliveryMethod',
          type: 'radio',
          label: 'Retiro en Tienda',
          value: 'retiro',
          checked: true
        },
        {
          name: 'deliveryMethod',
          type: 'radio',
          label: 'Despacho a Domicilio',
          value: 'despacho'
        }
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data) {
              this.deliveryMethod = data;
              this.registerPurchase(); // Registrar la compra después de seleccionar el método de entrega
            } else {
              this.showDeliveryMethodAlert(); // Volver a mostrar la alerta si no se seleccionó nada
            }
          }
        }
      ]
    });

    await alert.present();
  }
  

  async registerPurchase() {
    const productDetails = this.items.map(item => ({
        id: item.id,
        cantidad: item.quantity
    }));
    const productIds = productDetails.map(detail => detail.id);
    const cantidades = productDetails.map(detail => detail.cantidad);
    
    const purchaseData = {
        usuario: this.userId,
        productos_ids: productIds,
        cantidades: cantidades,
        total: this.total,
        delivery_method: this.deliveryMethod
    };

    try {
        const response = await this.apiService.registerPurchase(purchaseData);
        console.log('Compra registrada exitosamente', response);
    } catch (error) {
        console.error('Error al registrar la compra', error);
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al registrar la compra. Intenta nuevamente.',
            buttons: ['OK']
        });
        await alert.present();
    }
}
  
  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí',
          handler: async () => {
            await this.apiService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.getElementById('products-category-button');
    if (dropdown && button) {
      if (open) {
        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`; // adjust positioning
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }

  
}

