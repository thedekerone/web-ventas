import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        
        if ([401, 403].indexOf(err.status) !== -1) {
          this._authenticationService.logout();
          this._router.navigate(['/']);
        }
        // throwError
        const error = err.error.message || err.statusText;
        return throwError(error);

      })
    );
  }

}
