import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },

  {
    path: 'ruta',
    loadChildren: () => import('./pages/ruta/ruta/ruta.module').then(m => m.RutaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar-pedido',
    loadChildren: () => import('./pages/modificar-pedido/modificar-pedido.module').then(m => m.ModificarPedidoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar-pedido',
    loadChildren: () => import('./pages/agregar-pedido/agregar-pedido.module').then(m => m.AgregarPedidoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./pages/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
