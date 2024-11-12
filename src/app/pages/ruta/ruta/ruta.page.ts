import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  volver(){
    this.router.navigate(['/home']);
  }

}
