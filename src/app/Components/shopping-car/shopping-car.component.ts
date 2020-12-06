import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  @ViewChild('swalShop') swalPagar: SwalComponent;
  shoppingCart: any;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;
  clientData: any;
  total = 0;
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private userSerivce: UsuariosService
  ) { }

  ngOnInit(): void {
    this.clientData = JSON.parse(localStorage.getItem('session-data'));
    this.shoppingCart = JSON.parse(localStorage.getItem('carrito'));
    if (this.shoppingCart) {
      this.shoppingCart.forEach((element: any) => {
        this.total += (element.cantidad * element.producto.precio);
      });
    }
    this.stripeTest = this.fb.group({
      name: [this.clientData.nombres, [Validators.required]]
    });
  }

  openSwal(): void {
    this.swalPagar.fire();
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    const amount = this.total * 100;
    this.stripeService
      .createPaymentMethod({
        card: this.card.element,
        type: 'card'
      }).subscribe((result) => {
          if (result.paymentMethod) {
              this.userSerivce.pagarConTarjeta({
                token: result.paymentMethod.id,
                amount
              }).subscribe(data => {
                if (!data.error) {
                  Swal.fire({
                    title: 'El pago se realizo correctamente',
                    icon: 'success'
                  });
                  localStorage.removeItem('carrito');
                  window.location.reload();
                } else {
                  Swal.fire({
                    title: 'Ocurrio un error al realizar el pago',
                    icon: 'error'
                  });
                }
              }, err => console.log(err));
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
      });
  }

}
