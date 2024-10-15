import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/Models/user';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiConfigService } from '../api-config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  path = "Usuario"

  constructor(private apiService:ApiConfigService) { }

  async isDateExpired(): Promise<boolean> {
    const userData = await this.getDecryptedUserData();
    if (userData?.expiration && Date.now() < userData.expiration) {
        console.log("Usuario dentro del tiempo de expiración")
        return true; // La sesión es válida si el tiempo actual es menor a la expiración
    }
    console.log("Usuario fuera del tiempo de expiración")
    await this.logout(); // Si ya pasó el tiempo, desloguea
    return false;
  }

  async getDecryptedUserData() {
    const { value } = await Preferences.get({ key: 'userData' }); 
    if (value) {
      try {
        console.log("try")
        const bytes = CryptoJS.AES.decrypt(value, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (e) {
        console.log(e)
        this.logout();
      }
    }
    return null;
  }

  async logout() {
    await Preferences.remove({ key: 'userData' });
  }

  obtener_usuario(username: string): Observable<HttpResponse<User | null>> {
    const params = new HttpParams().set('select',"*");
    return this.apiService.get<User[]>(this.path, params).pipe(
      map(response => {
        console.log(response)
        const filteredBody = response.body?.find(user=> user.user == username  && user.rol != null);

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
