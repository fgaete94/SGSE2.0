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
import { User } from 'src/app/Models/user';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  [x: string]: any;

  mensaje = "";
  name = "";
  productos: Producto[] = [];
  pedidos: Pedido[] = [];
  userInfo: User | null = null;
  alertButtons = ['Ok'];
  cliente : Cliente[]= [];
  detalle: DetallePedido[] = [];

 


  constructor( private _serviceProducto:ProductoService,
    private _servicePedido: PedidoService,
    private router: Router,
    private _serviceCliente: ClienteService,
    private _serviceModPedido: ModificarPedidoService) {}

  async ngOnInit() {
    await this.getUserInfo();
    await this.verificarRolUsuario();  // Verifica el rol del usuario al iniciar la vista
    console.log("Información del usuario en ngOnInit:", JSON.stringify(this.userInfo, null, 2));
    this.obtenerPedido();
  }


  async ionViewWillEnter() {
    // Asegurarse de actualizar la información del usuario cada vez que se entra a la vista
    await this.getUserInfo();
    await this.verificarRolUsuario();
    console.log("Información del usuario en ionViewWillEnter:", JSON.stringify(this.userInfo, null, 2));
  }


 /* async obtenerProductos(){
    const response: HttpResponse<Producto[]>  = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response)
  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    console.log(response);
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
  


    async getUserInfo() {
      const { value } = await Preferences.get({ key: 'userData' });
      console.log("Valor recuperado de userData:", value); // Verificar el valor recuperado
    
      if (value) {
        try {
          const bytes = CryptoJS.AES.decrypt(value, environment.SECRETKEY);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          this.userInfo = JSON.parse(decryptedData);
          console.log("userInfo asignado después de desencriptar:", JSON.stringify(this.userInfo, null, 2)); // Mostrar toda la estructura
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }

  async logout() {
    // Limpiar los datos del usuario
    await Preferences.remove({ key: 'userData' });

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/auth']);
  }

  generarRuta(){
    this.router.navigate(['/ruta']);
  }

  modificarPedido(){
    this.router.navigate(['/modificar-pedido']);
  }
  
  editarPedido(){
    this.router.navigate(['/agregar-pedido']);
  }
  agregarCliente(){
    this.router.navigate(['/crear-cliente']);
  } 

  entregaPedido(){
    this.router.navigate(['/entrega-pedido']);
  }

  verReporte(){
    this.router.navigate(['/pedidos-totales']);
  }


  isAdmin(): boolean {
    console.log("Verificando rol de usuario:", this.userInfo?.rol);
    return Number(this.userInfo?.rol) === 1; // Convertimos a número para asegurar la comparación
  }

  async verificarRolUsuario() {
    const { value } = await Preferences.get({ key: 'userData' });
    
    if (value) {
      try {
        const bytes = CryptoJS.AES.decrypt(value, environment.SECRETKEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        this.userInfo = JSON.parse(decryptedData);
        
        console.log("Verificando el rol del usuario:", JSON.stringify(this.userInfo, null, 2));
  
        if (Number(this.userInfo?.rol) !== 1) {
          console.warn("El usuario no tiene el rol de administrador.");
        } else {
          console.log("Usuario con rol de administrador verificado.");
        }
      } catch (error) {
        console.error("Error al desencriptar y verificar el rol del usuario:", error);
      }
    } else {
      console.warn("No se encontró información del usuario.");
    }
  }

 /* 
TERMINAR ESTO 
 async actualizarEstado(estadoActualizado: actualizarEstado, pedido: Pedido) {
    try {
      console.log(estadoActualizado);
      const pedidoId = pedido.n_pedido; // Obtener el ID del pedido
      const response: HttpResponse<actualizarEstado> = await firstValueFrom(this._serviceModPedido.actualizarEstado(estadoActualizado, pedidoId));
      console.log('Response:', response);


    } catch (error) {
      console.error('Error:', error);
    }
  }*/


}