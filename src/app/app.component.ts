import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  /**
   *
   * @param {AuthenticationService} _authenticationService
   * @param {Router} _router
   */
  constructor(private _authenticationService: AuthenticationService, private _router: Router) { }

  /**
   * logOut Method
   */
  logOut(): void {
    this._authenticationService.logout();
    //redirect
    this._router.navigate(['/login']);
  }

  /**
   * get loginActive Method
   */
  public get loginActive(): Boolean{
    if(this._authenticationService.currentUserValue.token){
      return true;
    }else{
      return false;
    }
  }

  /**
   * get userEmail Method
   */
  public get userEmail():String{
    return this._authenticationService.currentUserValue.correo;
  }
  
}


