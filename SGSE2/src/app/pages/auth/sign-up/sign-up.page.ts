import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up-service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private signUpService: SignUpService,
    private router: Router
  ) {}

  async signUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const newUser = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: parseInt(this.telefono, 10),
      password: this.password,
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
        this.errorMessage = 'El usuario ya existe. Por favor, intente con otro correo.';
      } else {
        this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';
      }
      console.error(error);
    }
  }

  // Type Guard para verificar si el error es un HttpErrorResponse
  private isHttpError(error: unknown): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
}
