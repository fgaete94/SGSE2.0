import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page'; // Asegúrate de importar AuthPage correctamente

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Exporta RouterModule correctamente
})
export class AuthPageRoutingModule {} // Asegúrate de que este es el nombre que exportas
