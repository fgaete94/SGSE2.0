import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  
  
  baseUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  // Configurar headers comunes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apiKey': environment.apiKeySupabase,
      'Authorization': `Bearer ${environment.apiKeySupabase}`
    });
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error ocurrido:', error);
    return throwError(() => error);
  }

  // Método GET genérico
  get<T>(path: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders(), observe: 'response',  params })
      .pipe(
        catchError(this.handleError)
      );
  }

  post<T>(path: string, data: any): Observable<HttpResponse<T>> {
    return this.http.post<T>(
      `${this.baseUrl}/${path}`,
      data,
      {
        headers: this.getHeaders(),
        observe: 'response'
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(path : string, params : HttpParams, body: T): Observable<HttpResponse<T>>{
    return this.http.patch<T>(`${this.baseUrl}/${path}`, body,
      {
        headers: this.getHeaders(),
        observe: 'response',
        params
        
      }).pipe(
        catchError(this.handleError)
      )
    
  }

  delete<T>(path: string, params: HttpParams): Observable<HttpResponse<T>> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, {
      headers: this.getHeaders(),
      observe: 'response',
      params
    }).pipe(
      catchError(this.handleError)
    );
  }
  

}
