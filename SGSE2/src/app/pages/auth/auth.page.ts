import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/Models/user';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { environment } from 'src/environments/environment';
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

  constructor(private router: Router, private _authService: AuthServiceService) {}

  ngOnInit() {}

  async login(username: string, password: string) {
    try {
      const user = await this._authService.obtener_usuario(username).toPromise();
      this.userInfo = user?.body || null;

      if (this.userInfo && this.userInfo.user === username && this.userInfo.password === password) {
        // Verifica que rol esté presente antes de cifrar
        console.log("Rol del usuario:", this.userInfo.rol);
        if (!this.userInfo.rol) {
          this.errorMessage = "Error: El rol no está definido en la información del usuario";
          console.error(this.errorMessage);
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
        this.errorMessage = "Usuario no existente o contraseña incorrecta";
        console.error(this.errorMessage);
      }
    } catch (error) {
      this.errorMessage = "Error al intentar autenticar. Por favor, intente nuevamente.";
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
    }
  }
}
