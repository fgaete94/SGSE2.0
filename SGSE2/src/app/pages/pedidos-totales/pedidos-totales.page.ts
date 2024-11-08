import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/Models/pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pedidos-totales',
  templateUrl: './pedidos-totales.page.html',
  styleUrls: ['./pedidos-totales.page.scss'],
})
export class PedidosTotalesPage implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private _servicePedido: PedidoService,private router: Router) { }

  ngOnInit() {
    this.obtenerPedido();
  }

  async obtenerPedido() {
    try {
      // Obtener la lista de pedidos
      const response: HttpResponse<Pedido[]> = await firstValueFrom(this._servicePedido.obtener_pedido_full());
      console.log(response);
      this.pedidos = response.body || [];

    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      // Manejo de errores aquí
    }
  }

  volver(){
    this.router.navigate(['/home']);
  }
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pedidos);
    const workbook: XLSX.WorkBook = { Sheets: { 'Pedidos': worksheet }, SheetNames: ['Pedidos'] };
    XLSX.writeFile(workbook, 'pedidos.xlsx');
  }

}
