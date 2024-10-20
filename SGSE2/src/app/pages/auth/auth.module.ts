import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module'; // Importa correctamente el módulo de rutas
import { AuthPage } from './auth.page'; // Importa AuthPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule, // Asegúrate de que está agregado aquí
  ],
  declarations: [AuthPage], // Declara AuthPage aquí
})
export class AuthPageModule {}
