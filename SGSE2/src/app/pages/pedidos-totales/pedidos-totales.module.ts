import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosTotalesPageRoutingModule } from './pedidos-totales-routing.module';

import { PedidosTotalesPage } from './pedidos-totales.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosTotalesPageRoutingModule,
    SharedModule
  ],
  declarations: [PedidosTotalesPage]
})
export class PedidosTotalesPageModule {}
