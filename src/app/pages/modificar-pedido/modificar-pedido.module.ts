import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPedidoPageRoutingModule } from './modificar-pedido-routing.module';

import { ModificarPedidoPage } from './modificar-pedido.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPedidoPageRoutingModule,
    SharedModule
  ],
  declarations: [ModificarPedidoPage]
})
export class ModificarPedidoPageModule {}
