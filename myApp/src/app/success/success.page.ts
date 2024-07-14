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
  
      // Agregar el logo
      const logoUrl = 'https://8f68b14p-8000.brs.devtunnels.ms/media/productos/ferremas_logo.png';
      doc.addImage(logoUrl, 'PNG', 10, 10, 22, 20);
  
      // Agregar título
      doc.setFontSize(20);
      doc.text('Comprobante de Venta', 10, 40);
  
      // Agregar fecha y hora de creación
      const createdAt = new Date(voucher.created_at);
      const date = createdAt.toLocaleDateString();
      const time = createdAt.toLocaleTimeString();
      doc.setFontSize(12);
      doc.text(`Fecha: ${date}`, 10, 50);
      doc.text(`Hora: ${time}`, 50, 50);
  
      // Agregar detalles del voucher
      doc.setFontSize(12);
      doc.text(`Voucher ID: ${voucher.voucher_id}`, 10, 60);
      doc.text(`Voucher Emitido por: ${voucher.user.nombre} ${voucher.user.apellido}`, 10, 70);
      doc.text('---------------------------------------------', 10, 80);
  
      // Agregar detalles de los items
      let startY = 90;
      doc.text('Producto', 10, startY);
      doc.text('Cantidad', 80, startY);
      doc.text('Precio Unitario', 150, startY);
  
      voucher.items.forEach((item: any, index: number) => {
        const y = startY + 10 + (index * 10);
        doc.text(item.title, 10, y);
        doc.text(item.quantity.toString(), 80, y);
        doc.text(parseFloat(item.unit_price).toFixed(2).toString(), 150, y);
      });
  
      // Agregar total
      const total = parseFloat(voucher.total);
      const finalY = startY + 10 + (voucher.items.length * 10);
      doc.text('---------------------------------------------', 10, finalY);
      doc.text(`Total: ${total.toFixed(2)}`, 10, finalY + 10);
  
      // Guardar el PDF
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

    console.log('Product Details:', productDetails);
    console.log('Product IDs:', productIds);
    console.log('Cantidades:', cantidades);
    console.log('Purchase Data:', purchaseData);

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
        dropdown.style.top = `${rect.bottom}px`; 
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }

  
}

