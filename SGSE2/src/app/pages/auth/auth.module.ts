import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module'; // Importa correctamente el módulo de rutas
import { AuthPage } from './auth.page'; // Importa AuthPage
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule, // Asegúrate de que está agregado aquí
    SharedModule
  ],
  declarations: [AuthPage], // Declara AuthPage aquí
})
export class AuthPageModule {}
