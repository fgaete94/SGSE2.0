import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregaPedidoPageRoutingModule } from './entrega-pedido-routing.module';

import { EntregaPedidoPage } from './entrega-pedido.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregaPedidoPageRoutingModule,
    SharedModule
  ],
  declarations: [EntregaPedidoPage]
})
export class EntregaPedidoPageModule {}
