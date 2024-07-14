import { Component, OnInit } from '@angular/core';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { CartService } from '../services/cart.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {
  users: any[] = [];
  productosPaginados: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isDropdownOpen = false;
  isAuthenticated: boolean = false;
  role: string = '';
  isLoading: boolean = true;

  ROL_CHOICES = [
    { value: 'comprador', label: 'Comprador' },
    { value: 'vendedor', label: 'Vendedor' },
    { value: 'bodeguero', label: 'Bodeguero' },
    { value: 'admin', label: 'Admin' },
    { value: 'contador', label: 'Contador' }
  ];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private apiService: DjangoapiService,
    private cartService: CartService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.isLoading = true;  
    
    this.apiService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });

    this.apiService.role$.subscribe((role) => {
      this.role = role;
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error fetching users:', error);
    });
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  async editUser(user: any) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        { name: 'nombre', type: 'text', value: user.nombre, placeholder: 'Nombre' },
        { name: 'apellido', type: 'text', value: user.apellido, placeholder: 'Apellido' },
        { name: 'correo', type: 'email', value: user.correo, placeholder: 'Correo' },
        { name: 'direccion', type: 'text', value: user.direccion, placeholder: 'Dirección' },
        { name: 'rut', type: 'text', value: user.rut, placeholder: 'RUT' },
        { name: 'telefono', type: 'text', value: user.telefono, placeholder: 'Teléfono' },
        {
          name: 'rol',
          type: 'text',
          value: 'Dale a guardar para ir al rol',
          attributes: {
            readonly: true,
            placeholder: 'Dale a guardar para ir al rol'
          }
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            data.rol = user.rol; // Mantener el rol actual hasta que se seleccione uno nuevo
            this.showRoleSelector(user.id, data);
          }
        }
      ]
    });
    await alert.present();
  }

  async showRoleSelector(userId: number, data: any) {
    const alert = await this.alertController.create({
      header: 'Seleccionar Rol',
      inputs: this.ROL_CHOICES.map(choice => ({
        name: 'rol',
        type: 'radio',
        label: choice.label,
        value: choice.value,
        checked: data.rol === choice.value
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: roleData => {
            data.rol = roleData;
            console.log('Datos enviados:', data); // Añadir un log para verificar los datos
            this.apiService.updateUser(userId, data).subscribe(() => {
              this.showToast('Usuario actualizado', 'success');
              this.loadUsers();  // Refresca la lista de usuarios
            }, error => {
              console.error('Error en la actualización:', error); // Añadir un log para verificar el error
              this.showToast('Error al actualizar el usuario', 'danger');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
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
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }
  }

  addToCart(product: any) {
    const added = this.cartService.addToCart(product);
    if (added) {
      this.showToast('Producto agregado al carrito', 'success');
    } else {
      this.showToast('No hay suficiente stock online', 'danger');
    }
  }

  openCategoriesMenu() {
    this.menu.open('first');
  }

}

