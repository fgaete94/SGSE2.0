import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;


  constructor( private firebaseSvc : FirebaseService, private router: Router) { }

  ngOnInit() {}

   // Cerrar Sesión
   signOut(){
    this.firebaseSvc.signOut();
    }

    isHomePage(): boolean {
      return this.router.url.includes('/main'); // Aquí verificas si la ruta actual es "/home"
    }

}
