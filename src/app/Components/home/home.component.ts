import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];

  actualProduct: any;
  carrito = [];
  @ViewChild('swalAdd') private swalAddToCart: SwalComponent;
  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    this.productosService.obtenerTodosLosProductos()
      .subscribe(data => {
        if (!data.error) {
          this.products = data.productos;
        }
      }, err => console.log(err));
  }
  swalAddCart(product: any): void {
    this.swalAddToCart.fire();
    this.actualProduct = product;
  }

  agregarAlCarrito(cantidad: number): void {
    const cant = Number(cantidad);
    if (cant <= 0) {
      alert('Asegurate de agregar al menos un producto');
    } else {
      if (!localStorage.getItem('session-data')) {
        Swal.fire({
          title: 'AVISO',
          icon: 'warning',
          text: 'No puedes agregar productos sin haber iniciado sesión antes'
        });
      } else {
        let encontro = false;
        if (this.carrito.length > 0) {
          this.carrito.forEach((value, _) => {
            if (this.actualProduct.id_productos === value.producto.id_productos) {
              value.cantidad += cant;
              encontro = true;
            }
          });
          if (!encontro) {
            this.carrito.push({
              cantidad: cant,
              producto: this.actualProduct
            });
          }
        } else {
          this.carrito.push({
            cantidad: cant,
            producto: this.actualProduct
          });
        }
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(this.carrito);
        alert('El producto se agrego al carrito');
      }
    }
  }
}
