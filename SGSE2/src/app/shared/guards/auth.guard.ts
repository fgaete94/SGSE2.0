import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isDateExpired().then((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        // Redirigir al login si el usuario no está autenticado
        this.router.navigate(['/auth']);
        return false;
      }
    });
  }
}

// Nota: Crea este archivo 'auth.guard.ts' dentro de la carpeta 'shared/guards' en tu proyecto.
// Si no existe la carpeta 'guards' dentro de 'shared', créala para organizar mejor los guards de la aplicación.
