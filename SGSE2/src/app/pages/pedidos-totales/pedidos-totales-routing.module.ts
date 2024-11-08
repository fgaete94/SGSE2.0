import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosTotalesPage } from './pedidos-totales.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosTotalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosTotalesPageRoutingModule {}
