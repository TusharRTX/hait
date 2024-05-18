import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carritoKey = 'carrito';
  constructor() { }

  getCarrito() {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  addToCarrito(product: any) {
    const carrito = this.getCarrito();
    const index = carrito.findIndex((item: any) => item.id === product.id);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      product.cantidad = 1;
      carrito.push(product);
    }

    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  updateCantidad(productoId: number, cantidad: number) {
    const carrito = this.getCarrito();
    const index = carrito.findIndex((item: any) => item.id === productoId);

    if (index !== -1) {
      carrito[index].cantidad = cantidad;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
    }
  }

  getTotal() {
    const carrito = this.getCarrito();
    return carrito.reduce((total: number, item: any) => total + item.precio * item.cantidad, 0);
  }

  



}
