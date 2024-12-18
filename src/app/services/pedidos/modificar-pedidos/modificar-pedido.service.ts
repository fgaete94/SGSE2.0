import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../api-config/api-config.service';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pedido } from 'src/app/Models/pedido';
import { Comuna } from 'src/app/Models/comuna';
import { actualizarPedido } from 'src/app/Models/actualizar_pedido';
import { AgregarPedido } from 'src/app/Models/agregar_pedido';
import { User } from 'src/app/Models/user';
import { EstadoPedido } from 'src/app/Models/estado_pedido';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { EliminarPedido } from 'src/app/Models/eliminar_pedido';

@Injectable({
  providedIn: 'root'
})
export class ModificarPedidoService {

  path = "Pedido"
  path2 = "Comuna"
  path3 = "Usuario"
  path4 = "EstadoPedido"

  constructor(private _apiService:ApiConfigService) { }

  obtener_pedido(n_pedido:number): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<Pedido[]>(this.path, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(pedido => pedido.n_pedido == n_pedido);

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredBody,   // El nuevo array filtrado
          headers: response.headers,  // Copia los headers originales
          status: response.status,    // Copia el status original
          statusText: response.statusText,  // Copia el statusText original
        });
      })
    );
  }

  obtener_comuna(): Observable<HttpResponse<Comuna[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<Comuna[]>(this.path2, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(comuna => comuna.nombre != null);

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredBody,   // El nuevo array filtrado
          headers: response.headers,  // Copia los headers originales
          status: response.status,    // Copia el status original
          statusText: response.statusText,  // Copia el statusText original
        });
      })
    );
  }
  obtener_Repartidor(): Observable<HttpResponse<User[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<User[]>(this.path3, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(repartidor => repartidor.user != null);

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredBody,   // El nuevo array filtrado
          headers: response.headers,  // Copia los headers originales
          status: response.status,    // Copia el status original
          statusText: response.statusText,  // Copia el statusText original
        });
      })
    );
  }
  obtener_estado(): Observable<HttpResponse<EstadoPedido[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<EstadoPedido[]>(this.path4, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(estado => estado.id != null);

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredBody,   // El nuevo array filtrado
          headers: response.headers,  // Copia los headers originales
          status: response.status,    // Copia el status original
          statusText: response.statusText,  // Copia el statusText original
        });
      })
    );
  }

  actualizarPedido(pedidoActualizado:actualizarPedido , n_pedido:number): Observable<HttpResponse<actualizarPedido>>{
    const params = new HttpParams().set('n_pedido',`eq.${n_pedido}`)
    return this._apiService.patch<actualizarPedido>(this.path,params,pedidoActualizado)
  }

  eliminarPedido(n_pedido: number,eliminarPedido : EliminarPedido): Observable<HttpResponse<EliminarPedido>> {
    const params = new HttpParams().set('n_pedido', `eq.${n_pedido}`);
    return this._apiService.patch<EliminarPedido>(this.path, params,eliminarPedido);
  }

  agregarPedido(nuevoPedido: AgregarPedido): Observable<HttpResponse<AgregarPedido>> {
    return this._apiService.post<AgregarPedido>(this.path, nuevoPedido);
  }

  actualizarEstado(estadoActualizado:actualizarEstado , n_pedido:number): Observable<HttpResponse<actualizarEstado>>{
    const params = new HttpParams().set('n_pedido',`eq.${n_pedido}`)
    return this._apiService.patch<actualizarEstado>(this.path,params,estadoActualizado)
  }
  


}
