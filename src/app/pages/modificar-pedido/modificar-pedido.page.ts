import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Models/pedido';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { Comuna } from 'src/app/Models/comuna';
import { actualizarPedido } from 'src/app/Models/actualizar_pedido';
import { AlertController } from '@ionic/angular';
import { ApiConfigService } from 'src/app/services/api-config/api-config.service';
import { EstadoPedido } from 'src/app/Models/estado_pedido';

@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.page.html',
  styleUrls: ['./modificar-pedido.page.scss'],
})
export class ModificarPedidoPage implements OnInit {

 

  n_pedido: number = 0;
  pedidoInfo: Pedido[] = [];
  productos: Producto[] = [];
  comunas: Comuna[] = [];
  estados: EstadoPedido[] = [];
  pedidoActualizado: actualizarPedido = {
    direccion: "",
    comuna: {} as Comuna,
    producto: {} as Producto,
    cantidad: 0,
    tel_contacto: 0,
    update_at: new Date(),
    estado: {} as EstadoPedido
  }



  constructor(private router: Router,
    private _serviceModPedido: ModificarPedidoService,
    private _serviceProducto: ProductoService,
  private utilsSvc: ApiConfigService ) { }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerComunas();
    this.obtenerEstado();
  }

  async obtenerPedido(n_pedido: number) {
    const response: HttpResponse<Pedido[]> = await firstValueFrom(this._serviceModPedido.obtener_pedido(n_pedido));
    console.log(response);
    this.pedidoInfo = response.body || [];
  }
  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response)
    this.productos = response.body || [];
  }

  async obtenerComunas() {
    const response: HttpResponse<Comuna[]> = await firstValueFrom(this._serviceModPedido.obtener_comuna());
    console.log(response)
    this.comunas = response.body || [];
  }

  async obtenerEstado() {
    const response: HttpResponse<EstadoPedido[]> = await firstValueFrom(this._serviceModPedido.obtener_estado());
    console.log(response)
    this.estados = response.body || [];
  }

  async actualizarPedido(pedidoActualizado: actualizarPedido) {
    console.log(pedidoActualizado);
    try {
      console.log(pedidoActualizado);
      const response: HttpResponse<actualizarPedido> = await firstValueFrom(this._serviceModPedido.actualizarPedido(pedidoActualizado, this.n_pedido));
      console.log('Response:', response);

      this.utilsSvc.presentToast({
        message: 'Pedido modificado exitosamente', 
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'checkmark-done-outline'
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }


  async eliminarPedido() {
    try {
      const response: HttpResponse<Pedido> = await firstValueFrom(this._serviceModPedido.eliminarPedido(this.n_pedido));
      console.log('Pedido eliminado con éxito:', response);

      this.utilsSvc.presentToast({
        message: 'Pedido eliminado exitosamente', 
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'checkmark-done-outline'
      })
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  }

  // agregar funcion de agregar pedido (julio)


  volver() {
    this.router.navigate(['/home']);
  }

  editarPedido(){
    this.router.navigate(['/agregar-pedido']);
  }

}
