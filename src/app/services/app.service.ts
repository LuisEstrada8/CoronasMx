import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  URL = 'http://localhost:3040/';
  constructor() { }
}