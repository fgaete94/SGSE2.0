import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Producto } from 'src/app/Models/producto';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pedido } from 'src/app/Models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  path = "Pedido"

  constructor(private apiService:ApiConfigService) { }

  obtener_pedido(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select',"*");
    return this.apiService.get<Pedido[]>(this.path, params).pipe(
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
}
