import { Component } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensaje = ""
  name = ""
  productos: Producto[] = [];
  alertButtons = ['Ok'];

  constructor( private _serviceProducto:ProductoService ) {}
  ngOnInit(){
    this.obtenerProductos();

  } 

  async obtenerProductos(){
    const response: HttpResponse<Producto[]>  = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response)
    this.productos = response.body || [];
  }



}
