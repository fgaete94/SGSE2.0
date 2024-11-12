import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPedidoPageRoutingModule } from './agregar-pedido-routing.module';

import { AgregarPedidoPage } from './agregar-pedido.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPedidoPageRoutingModule,
    SharedModule
  ],
  declarations: [AgregarPedidoPage]
})
export class AgregarPedidoPageModule {}
