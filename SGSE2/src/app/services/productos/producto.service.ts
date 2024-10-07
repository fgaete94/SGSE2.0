import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Producto } from 'src/app/Models/producto';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  path = "productos"

  constructor(private apiService:ApiConfigService) { }

  obtener_productos(): Observable<HttpResponse<Producto[]>> {
    const params = new HttpParams().set('select',"*");
    return this.apiService.get<Producto[]>(this.path, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.filter(product => product.deleted_at === null);

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
