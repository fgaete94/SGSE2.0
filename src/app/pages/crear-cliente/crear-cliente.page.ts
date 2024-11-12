import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { agregarCliente } from 'src/app/Models/agregar_cliente';
import { Cliente } from 'src/app/Models/cliente';
import { Comuna } from 'src/app/Models/comuna';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';
import { firstValueFrom } from 'rxjs';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { Router } from '@angular/router';
import { ApiConfigService } from 'src/app/services/api-config/api-config.service';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {

  comunas: Comuna[] = [];

  nuevoCliente: agregarCliente = {
    nombre: '',
    telefono: 0,
    direccion: '',
    comuna: {} as Comuna,
    mail: ''
  };
  

  constructor(private _serviceModPedido: ModificarPedidoService,
    private _serviceCliente: ClienteService,
    private router: Router,
    private utilsSvc : ApiConfigService) { }

  ngOnInit() {
    this.obtenerComunas();
  }

  async obtenerComunas() {
    const response: HttpResponse<Comuna[]> = await firstValueFrom(
      this._serviceModPedido.obtener_comuna()
    );
    console.log(response);
    this.comunas = response.body || [];
  }

  async agregarCliente() {
    try {
      console.log('Nuevo Cliente:', this.nuevoCliente);
      const response: HttpResponse<agregarCliente> = await firstValueFrom(
        this._serviceCliente.agregarCliente(this.nuevoCliente)
      );
      console.log('Pedido agregado exitosamente:', response);
      this.volver(); // Navegar de regreso a la página anterior

      this.utilsSvc.presentToast({
        message: 'Cliente agregado exitosamente', 
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'checkmark-done-outline'
      })
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }

}


