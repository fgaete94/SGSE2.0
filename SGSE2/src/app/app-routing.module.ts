import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },

  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'crear-pedido',
    loadChildren: () => import('./pages/crear-pedido/crear-pedido/crear-pedido.module').then( m => m.CrearPedidoPageModule)
  },
  {
    path: 'ruta',
    loadChildren: () => import('./pages/ruta/ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'modificar-pedido',
    loadChildren: () => import('./pages/modificar-pedido/modificar-pedido.module').then( m => m.ModificarPedidoPageModule)
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
