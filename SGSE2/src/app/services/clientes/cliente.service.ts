import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Cliente } from 'src/app/Models/cliente';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { agregarCliente } from 'src/app/Models/agregar_cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  path = "Cliente"

  constructor(private _apiService : ApiConfigService) { }

  obtener_cliente(): Observable<HttpResponse<Cliente[]>> {
    const params = new HttpParams().set('select',"*");
    return this._apiService.get<Cliente[]>(this.path, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(cliente => cliente.nombre != null);

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

  agregarCliente(nuevocliente: agregarCliente): Observable<HttpResponse<agregarCliente>> {
    return this._apiService.post<agregarCliente>(this.path, nuevocliente);
  }
}
