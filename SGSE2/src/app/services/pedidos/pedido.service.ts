import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pedido } from 'src/app/Models/pedido';
import { DetallePedido } from 'src/app/Models/detalle_pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  path = "Pedido"
  path2 = "Detalle_Pedido"


  constructor(private _apiService:ApiConfigService) { }

  obtener_pedido(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<Pedido[]>(this.path, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(pedido => pedido.n_pedido != null);

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

  obtener_detalle_pedido(id: number): Observable<HttpResponse<DetallePedido[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<DetallePedido[]>(this.path2, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(detalle_pedido => detalle_pedido.id = id);

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


}
