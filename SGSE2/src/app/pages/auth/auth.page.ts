import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/Models/user';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { environment } from 'src/environments/environment';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiConfigService } from 'src/app/services/api-config/api-config.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  message: string = '';
  user = "";
  password = "";
  errorMessage: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  private sessionDuration = 5 * 60 * 1000;

  userInfo: User | null = null;

  constructor(private router: Router, private _authService: AuthServiceService, private apiService: ApiConfigService) {}

  ngOnInit() {}

  async obtenerUser(username: string): Promise<User | null> {
    try {
      const params = new HttpParams().set('user', `eq.${username}`);
      const response: HttpResponse<User[]> = await firstValueFrom(
        this.apiService.get<User[]>('Usuario', params)
      );
      
      if (response.body && response.body.length > 0) {
        return response.body[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  }

  async login(username: string, password: string) {
    try {
        const user = await this.obtenerUser(username);
        this.userInfo = user;
  
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
        this.errorMessage = "Error al obtener el usuario. Por favor, intente nuevamente.";
        console.error(this.errorMessage, error);
    }
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
  
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
      console.error("Error al obtener el usuario:", Error);
    }
  }
}
