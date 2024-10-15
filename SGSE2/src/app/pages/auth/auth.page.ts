import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/Models/user';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  message: string = '';

  username = "";
  password = "";

  private sessionDuration = 5 * 60 * 1000;

  userInfo : User[]=[];


  constructor(private router : Router, private _authService: AuthServiceService) { }

  ngOnInit() {
    this.obtenerUser(this.username);
  }

  async obtenerUser(username: string){
    const response: HttpResponse<User | null>  = await firstValueFrom(this._authService.obtener_usuario(username));
    console.log(response)
    this.userInfo = response.body ? [response.body] : [];
  }

  async login(username: string, password: string){
    if (this.userInfo.length > 0 && this.userInfo[0].user === username && this.userInfo[0].password === password){
      const expiration = Date.now() + this.sessionDuration;
      const userData = { ...this.userInfo, expiration };
      /*const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), environment.secretKey ).toString();

      /await Preferences.set({
        key: 'userData',
        value: encryptedData,
      }); */
      

      this.router.navigate(['/home']);
    }else{
      console.error("Usuario no existente")
    }
  }




}
