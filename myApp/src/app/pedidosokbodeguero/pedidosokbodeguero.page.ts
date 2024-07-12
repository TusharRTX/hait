import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  


@Component({
  selector: 'app-pedidosokbodeguero',
  templateUrl: './pedidosokbodeguero.page.html',
  styleUrls: ['./pedidosokbodeguero.page.scss'],
})
export class PedidosokbodegueroPage implements OnInit {
  pedidos: any[] = [];
  isLoading = false;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  clientes: any[] = [];
  selectedCliente: string = '';
  filteredPedidos: any[] = [];
  
  

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController,private apiService: DjangoapiService,private menu: MenuController) {}

  ngOnInit() {
    this.fetchPedidos();

    this.apiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.apiService.role$.subscribe(role => {
      this.role = role;
    });
  }

  fetchPedidos() {
    this.isLoading = true;  // Mostrar la animación de carga
    this.apiService.getPedidoFinal().subscribe(
      response => {
        this.pedidos = response;
        this.pedidos.forEach(pedido => {
          if (pedido.productos) {
            try {
              pedido.productos = JSON.parse(pedido.productos);
            } catch (e) {
              console.error('Error parsing productos JSON:', e);
            }
          }
        });
        // Cargar clientes únicos
        this.clientes = Array.from(new Set(this.pedidos.map(pedido => pedido.usuario_username)));
        // Mostrar solo pedidos enviados al inicio
        this.filteredPedidos = this.pedidos.filter(pedido => pedido.enviada_a_vendedor);
        this.isLoading = false;  // Ocultar la animación de carga
      },
      error => {
        console.error('Error fetching pedidos:', error);
        this.isLoading = false;  // Ocultar la animación de carga
      }
    );
  }

  onClienteChange() {
    if (this.selectedCliente) {
      this.filteredPedidos = this.pedidos.filter(pedido => pedido.usuario_username === this.selectedCliente);
    } else {
      this.filteredPedidos = this.pedidos.filter(pedido => pedido.enviada_a_vendedor);
    }
  }
  

  enviarPedidoCorreo(pedido: any) {
    const email = pedido.usuario_correo;
    const subject = `Estado del Pedido ${pedido.id}`;
    const body = `
      Nombre: ${pedido.usuario_nombre}
      Apellido: ${pedido.usuario_apellido}
      Correo: ${pedido.usuario_correo}
      Teléfono: ${pedido.usuario_telefono}
      Dirección: ${pedido.usuario_direccion}
      RUT: ${pedido.usuario_rut}
      Total: ${pedido.pedido_total}
      Delivery: ${pedido.pedido_delivery_method}
      Productos:
      ${pedido.productos.map((producto: any) => `Código: ${producto.codigo} / Nombre: ${producto.nombre} / Cantidad: ${producto.cantidad} / Precio: ${producto.precio}`).join('\n')}
      
      Estado de Bodega: ${pedido.estado_bodeguero}
      Nota del Bodeguero: ${pedido.nota_bodeguero}
      

      Logo:
      https://media.discordapp.net/attachments/968742341613596692/1241022234265518242/logo2_preview_rev_1.png?ex=6691dac5&is=66908945&hm=7721e602804f06b3ca77a9277659592eaa14e4c196db80096ce86f2c4b2438a8&=&format=webp&quality=lossless
    `;
  
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    this.apiService.markPedidoAsSent(pedido.id).subscribe(
      response => {
        pedido.enviada_a_vendedor = false;
        console.log('Pedido marcado como enviado:', response);
        this.fetchPedidos();
        this.presentToast('Pedido enviado al cliente');
      },
      error => {
        console.error('Error marking pedido as sent:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
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
        },
        {
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

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}


