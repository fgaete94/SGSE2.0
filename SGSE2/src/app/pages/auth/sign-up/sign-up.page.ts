// sign-up.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up-service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  nombre: string = '';
  apellido: string = '';
  user: string = '';
  correo: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  errorFields: { [key: string]: string } = {};
  
  constructor(
    private signUpService: SignUpService,
    private router: Router
  ) {}

  async signUp() {
    // Limpiar mensajes de error
    this.errorFields = {};
    this.errorMessage = '';

    // Validaciones
    if (!this.isValidName(this.nombre)) {
      this.errorFields['nombre'] = 'El nombre debe contener al menos 3 letras y no puede incluir números.';
    }
    if (!this.isValidName(this.apellido)) {
      this.errorFields['apellido'] = 'El apellido debe contener al menos 3 letras y no puede incluir números.';
    }
    if (this.user.length < 3) {
      this.errorFields['user'] = 'El nombre de usuario debe contener al menos 3 letras.';
    }
    if (!this.isValidEmail(this.correo)) {
      this.errorFields['correo'] = 'El correo electrónico no tiene un formato válido.';
    }
    if (!this.isValidPhoneNumber(this.telefono)) {
      this.errorFields['telefono'] = 'El número de teléfono debe contener al menos 9 dígitos.';
    }
    if (this.password.length < 6) {
      this.errorFields['password'] = 'La contraseña debe contener al menos 6 caracteres.';
    }
    if (this.password !== this.confirmPassword) {
      this.errorFields['confirmPassword'] = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(this.errorFields).length > 0) {
      return;
    }

    // Encriptar la contraseña antes de enviarla
    const encryptedPassword = CryptoJS.AES.encrypt(this.password, environment.secretKey).toString();

    const newUser = {
      nombre: this.nombre,
      apellido: this.apellido,
      user: this.user, // Asignar el nombre de usuario
      correo: this.correo,
      telefono: parseInt(this.telefono, 10),
      password: encryptedPassword,
      rol: 2, // Solo enviamos el ID del rol
    };

    try {
      const response = await firstValueFrom(
        this.signUpService.registrarUsuario(newUser)
      );

      if (response.status === 201) {
        console.log('Usuario registrado exitosamente:', response.body);
        this.router.navigate(['/auth']);
      } else {
        this.errorMessage = 'Error al registrar el usuario.';
      }
    } catch (error: unknown) {
      if (this.isHttpError(error) && error.status === 409) {
        this.errorFields['user'] = 'El usuario ya existe. Por favor, intente con otro nombre de usuario.';
      } else {
        this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';
      }
      console.error(error);
    }
  }

  // Validaciones
  private isValidName(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(name);
  }

  private isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  private isValidPhoneNumber(phone: string): boolean {
    return /^[0-9]{9,}$/.test(phone);
  }

  // Type Guard para verificar si el error es un HttpErrorResponse
  private isHttpError(error: unknown): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
}
