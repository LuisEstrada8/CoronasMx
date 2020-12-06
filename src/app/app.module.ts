import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ForoComponent } from './Components/foro/foro.component';
import { HomeComponent } from './Components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {  HttpClientModule } from '@angular/common/http';
import { ShoppingCarComponent } from './Components/shopping-car/shopping-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    AppComponent,
    ForoComponent,
    HomeComponent,
    NavbarComponent,
    ShoppingCarComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51HvSPsBJt2QKX5ofUN0Czh0kUkj623s0ZYaO77v71GO6D0WAgB2h0L7KZIkUpRP3HTSjKofL4yvHb2UwVP4nwNLx00vC5V9MQV'),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
