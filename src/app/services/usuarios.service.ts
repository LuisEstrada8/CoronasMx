import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private appSerivce: AppService) { }

  login(body: any): Observable<any> {
    return this.http.post(this.appSerivce.URL + 'login', body);
  }
  registrarUsuario(body: any): Observable<any> {
    return this.http.post(this.appSerivce.URL + 'registro', body);
  }

  pagarConTarjeta(body: any): Observable<any> {
    return this.http.post(this.appSerivce.URL + 'pay-card', body);
  }
}
