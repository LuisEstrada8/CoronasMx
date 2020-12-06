import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formLogin: FormGroup;
  formRegistro: FormGroup;
  userData = {};
  carrito: any;
  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
    this.formRegistro = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    }
  }

  login() {
    this.usuariosService.login(this.formLogin.value)
      .subscribe (data => {
        if (data.auth) {
          localStorage.setItem('session-data', JSON.stringify(data.usuario));
          window.location.reload();
        } else {
          Swal.fire({
            title: 'Aviso',
            text: data.msg,
            icon: 'info'
          });
        }
      }, err => console.log(err));
  }

  registro() {
    this.usuariosService.registrarUsuario(this.formRegistro.value)
      .subscribe( data => {
        if (!data.error) {
          Swal.fire({
            title: 'Aviso',
            icon: 'success',
            text: data.msg
          }).then(() => this.formRegistro.reset());
        }
      }, err => console.log(err));
  }
  cerrarSesion() {
    localStorage.removeItem('session-data');
    window.location.reload();
  }
}
