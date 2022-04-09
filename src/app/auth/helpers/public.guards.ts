import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthenticationService } from "src/app/auth/services/authentication.service";

@Injectable({ providedIn: "root" })
export class PublicGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._authenticationService.currentUserValue.id) {
      return true;
    } else {
      this._router.navigate(["/"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
