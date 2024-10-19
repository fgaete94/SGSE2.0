import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/Models/user';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  message: string = '';

  username = "";
  password = "";

  private sessionDuration = 5 * 60 * 1000;

  userInfo: User | null = null;

  constructor(private router: Router, private _authService: AuthServiceService) { }

  ngOnInit() {
    
    
  }

  async obtenerUser(username: string): Promise<User | null> {
      const response: HttpResponse<User | null> = await firstValueFrom(this._authService.obtener_usuario(username));
      console.log(response);
      return response.body ? response.body : null;
  }

  async login(username: string, password: string) {
    try {
      const response = await firstValueFrom(this._authService.obtener_usuario(username));
      this.userInfo = response.body;
  
      console.log("Información del usuario después del login:", this.userInfo);
  
      if (this.userInfo && this.userInfo.user === username && this.userInfo.password === password) {
        // Verifica que rol esté presente antes de cifrar
        console.log("Rol del usuario:", this.userInfo.rol);
        if (!this.userInfo.rol) {
          console.error("Error: El rol no está definido en la información del usuario");
          return;
        }
  
        const expiration = Date.now() + this.sessionDuration;
        const userData = { ...this.userInfo, expiration };
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), environment.secretKey).toString();
  
        await Preferences.set({
          key: 'userData',
          value: encryptedData,
        });
  
        this.router.navigate(['/home']);
      } else {
        console.error("Usuario no existente o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }
}
