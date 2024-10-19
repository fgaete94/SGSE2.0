import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private path = 'Usuario'; // Tabla en Supabase

  constructor(private apiService: ApiConfigService) {}

  // Reutilizamos el método POST del api-config.service
  registrarUsuario(userData: any): Observable<HttpResponse<any>> {
    return this.apiService.post<any>(this.path, userData);
  }
}
