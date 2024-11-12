import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrega-pedido',
  templateUrl: './entrega-pedido.page.html',
  styleUrls: ['./entrega-pedido.page.scss'],
})
export class EntregaPedidoPage implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(['/home']);
  }

}
