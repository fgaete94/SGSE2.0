import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Models/pedido';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { Comuna } from 'src/app/Models/comuna';
import { AgregarPedido } from 'src/app/Models/agregar_pedido';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { User } from 'src/app/Models/user';
import { ApiConfigService } from 'src/app/services/api-config/api-config.service';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.page.html',
  styleUrls: ['./agregar-pedido.page.scss'],
})
export class AgregarPedidoPage implements OnInit {
  pedidoInfo: Pedido[] = [];
  productos: Producto[] = [];
  comunas: Comuna[] = [];
  cliente: Cliente[] = [];
  repartidor: User[] = [];  // Se agrega el repartidor
  nuevoPedido: AgregarPedido = {
    direccion: '',
    comuna: {} as Comuna,
    cliente: {} as Cliente,
    repartidor: {} as User,  // Se agrega el repartidor
    //n_pedido: 0,
    producto: {} as Producto,
    cantidad: 0,
    tel_contacto: 0,
  };

  constructor(
    private router: Router,
    private _serviceModPedido: ModificarPedidoService,
    private _serviceProducto: ProductoService,
    private _serviceCliente: ClienteService,
    private utilsSvc: ApiConfigService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerComunas();
    this.obtenerCliente();
    this.obtenerRepartidor();  // Se agrega el repartidor
  }

  async obtenerPedido(n_pedido: number) {
    const response: HttpResponse<Pedido[]> = await firstValueFrom(
      this._serviceModPedido.obtener_pedido(n_pedido)
    );
    console.log(response);
    this.pedidoInfo = response.body || [];
  }

  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    console.log(response);
    this.productos = response.body || [];
  }

  async obtenerComunas() {
    const response: HttpResponse<Comuna[]> = await firstValueFrom(
      this._serviceModPedido.obtener_comuna()
    );
    console.log(response);
    this.comunas = response.body || [];
  }

  async obtenerCliente() {
    const response: HttpResponse<Cliente[]> = await firstValueFrom(
      this._serviceCliente.obtener_cliente()
    );
    console.log(response);
    this.cliente = response.body || [];
  }

  async obtenerRepartidor() {
    const response: HttpResponse<User[]> = await firstValueFrom(
      this._serviceModPedido.obtener_Repartidor()
    );
    console.log(response);
    this.repartidor = response.body || [];
  }

  async agregarPedido() {
    try {
      console.log('Nuevo Pedido:', this.nuevoPedido);
      const response: HttpResponse<AgregarPedido> = await firstValueFrom(
        this._serviceModPedido.agregarPedido(this.nuevoPedido)
      );
      console.log('Pedido agregado exitosamente:', response);
      this.volver(); // Navegar de regreso a la página anterior
      
      this.utilsSvc.presentToast({
        message: 'Pedido agregado exitosamente', 
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'checkmark-done-outline'
      })

    } catch (error) {
      console.error('Error al agregar pedido:', error);
    }
  }
  
  
  
  

  volver() {
    this.router.navigate(['/home']);
  }
}
