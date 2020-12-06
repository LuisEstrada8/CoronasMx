import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private appService: AppService) { }


  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get(this.appService.URL + 'productos');
  }
}
