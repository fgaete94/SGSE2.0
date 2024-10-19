import { Component } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { Pedido } from 'src/app/Models/pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensaje = "";
  name = "";
  productos: Producto[] = [];
  pedidos: Pedido[] = [];
  userInfo: User | null = null;
  alertButtons = ['Ok'];

  constructor(
    private _serviceProducto: ProductoService,
    private _servicePedido: PedidoService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.getUserInfo();
    console.log("Información del usuario en ngOnInit:", JSON.stringify(this.userInfo, null, 2));
    this.obtenerProductos();
    this.obtenerPedido();
  }

  async ionViewWillEnter() {
    // Asegurarse de actualizar la información del usuario cada vez que se entra a la vista
    await this.getUserInfo();
    console.log("Información del usuario en ionViewWillEnter:", JSON.stringify(this.userInfo, null, 2));
  }

  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    console.log(response);
    this.productos = response.body || [];
  }

  async obtenerPedido() {
    const response: HttpResponse<Pedido[]> = await firstValueFrom(
      this._servicePedido.obtener_pedido()
    );
    console.log(response);
    this.pedidos = response.body || [];
  }

  async getUserInfo() {
    const { value } = await Preferences.get({ key: 'userData' });
    console.log("Valor recuperado de userData:", value); // Verificar el valor recuperado
  
    if (value) {
      try {
        const bytes = CryptoJS.AES.decrypt(value, environment.secretKey);
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

  isAdmin(): boolean {
    console.log("Verificando rol de usuario:", this.userInfo?.rol);
    return this.userInfo?.rol?.id === 1;
  }
}