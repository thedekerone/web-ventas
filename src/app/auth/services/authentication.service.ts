import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
//import { BackOfficeService } from 'src/app/services/api/v1/authorization/backoffice.service';
import { User } from "src/app/auth/models/user";
import { of } from "rxjs";
import { BackOfficeService } from "src/app/services/back-office.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  //private
  private currentUserSubject: BehaviorSubject<User>;
  private userLogOut: User;

  /**
   * Constructor
   *
   * @param {BackOfficeService} _backOfficeService
   */
  constructor(private _backOfficeService: BackOfficeService) {
    this.userLogOut = {
      id: 0,
      nombre: "",
      correo: "",
      token: "",
    };
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(
        localStorage.getItem("currentUser") || JSON.stringify(this.userLogOut)
      )
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Method that returns the active user.
   *
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Method that detects the validity of the token.
   *
   */
  public get isTokenValid() {
    return 0;
  }

  /**
   * User login with credentials
   *
   * @param login
   * @param password
   * @returns user
   */
  login(login: string, password: string) {
    return this._backOfficeService.login(login, password).pipe(
      map((user: User) => {
        if (user && user.token) {
          user.correo = login;
          localStorage.setItem("currentUser", JSON.stringify(user));
          // notify
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      catchError((error) => {
        console.log("Caught search error the wrong way!");
        console.log(error);
        return of(null);
      })
    );
    var userFake: User = {
      id: 1,
      nombre: "Jorge",
      correo: "jorge.limox@iteraprocess.com",
      token: "token_fake",
    };
    localStorage.setItem("currentUser", JSON.stringify(userFake));
    this.currentUserSubject.next(userFake);
    return userFake;
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    // notify
    this.currentUserSubject = new BehaviorSubject({} as User);
  }
}
