import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;


  constructor( private router: Router) { }

  ngOnInit() {}

  isHomePage(): boolean {
    const currentUrl = this.router.url;
    return !currentUrl.includes('/auth') && !currentUrl.includes('/sign-up');
  }

  async logout() {
    // Limpiar los datos del usuario
    await Preferences.remove({ key: 'userData' });

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/auth']);
  }



}
