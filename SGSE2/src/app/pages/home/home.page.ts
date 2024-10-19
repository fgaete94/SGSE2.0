import { Component } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { Pedido } from 'src/app/Models/pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensaje = ""
  name = ""
  productos: Producto[] = [];
  pedidos: Pedido[] = [];
  alertButtons = ['Ok'];

  constructor( private _serviceProducto:ProductoService, private _servicePedido: PedidoService, private router: Router ) {}
  ngOnInit(){
    this.obtenerProductos();
    this.obtenerPedido();

  } 

  async obtenerProductos(){
    const response: HttpResponse<Producto[]>  = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response)
    this.productos = response.body || [];
  }

  async obtenerPedido(){
    const response: HttpResponse<Pedido[]>  = await firstValueFrom(this._servicePedido.obtener_pedido());
    console.log(response)
    this.pedidos = response.body || [];
  }

  async logout() {
    // Limpiar los datos del usuario
    await Preferences.remove({ key: 'userData' });

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/auth']);
  }



}
