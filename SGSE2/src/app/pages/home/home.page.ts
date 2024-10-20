import { Component } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { Pedido } from 'src/app/Models/pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { DetallePedido } from 'src/app/Models/detalle_pedido';



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
  cliente : Cliente[]= [];
  detalle: DetallePedido[] = [];

 

  constructor( private _serviceProducto:ProductoService,
    private _servicePedido: PedidoService,
    private router: Router,
    private _serviceCliente: ClienteService,) {}
  ngOnInit(){
    
    this.obtenerPedido();
    //this.obtenerCliente();
    
    

  } 

 /* async obtenerProductos(){
    const response: HttpResponse<Producto[]>  = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response)
    this.productos = response.body || [];
  }*/

  async obtenerPedido() {
    try {
      // Obtener la lista de pedidos
      const response: HttpResponse<Pedido[]> = await firstValueFrom(this._servicePedido.obtener_pedido());
      console.log(response);
      this.pedidos = response.body || [];
  
      /* Obtener información del detalle
      for (const pedido of this.pedidos) {
        const detalleID: number = + pedido.detalle_pedido;
        const detalleResponse: HttpResponse<DetallePedido[]> = await firstValueFrom(this._servicePedido.obtener_detalle_pedido(detalleID));
        this.detalle = detalleResponse.body || [];
        console.log(this.detalle);

        // Obtener información del producto
        const productoID: number = +this.detalle[0].producto;
        const productoResponse: HttpResponse<Producto[]> = await firstValueFrom(this._serviceProducto.obtener_productos(productoID));
        this.productos = productoResponse.body || [];

        // obtener información del cliente  
        const clienteResponse: HttpResponse<Cliente[]> = await firstValueFrom(this._serviceCliente.obtener_cliente());
        this.cliente = clienteResponse.body || [];
      }*/


    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      // Manejo de errores aquí
    }
  }

 /* async obtenerCliente(){
    const response: HttpResponse<Cliente[]> = await firstValueFrom(this._serviceCliente.obtener_cliente());
    console.log(response);
    this.cliente = response.body || [];
  }

  async obtenenerDetallePedido(){
    const response: HttpResponse<Cliente[]> = await firstValueFrom(this._serviceCliente.obtener_cliente());
    console.log(response);
    this.cliente = response.body || [];
  }*/
  


  async logout() {
    // Limpiar los datos del usuario
    await Preferences.remove({ key: 'userData' });

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/auth']);
  }

  generarRuta(){
    this.router.navigate(['/ruta']);
  }



}
