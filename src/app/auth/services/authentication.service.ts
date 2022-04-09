import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
//import { BackOfficeService } from 'src/app/services/api/v1/authorization/backoffice.service';
import { User, UserResponse } from "src/app/auth/models/user";
import { of } from "rxjs";
import { BackOfficeService } from "src/app/services/back-office.service";
import { StorageService } from "src/app/services/storage.service";
import { Cognito } from "../models/cognito";
import { SharedService } from "src/app/services/shared.service";

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
  constructor(
    private _backOfficeService: BackOfficeService,
    private crypto: SharedService,
    private storage: StorageService
  ) {
    this.userLogOut = {
      nombre: "",
      apellido_materno: "",
      username: "",
      apellido_paterno: "",
      id: 0,
    };
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(
        this.crypto.decrypt(
          this.storage.getCookie("zxc21dsrty5uyj11j1"),
          this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
        ) || JSON.stringify(this.userLogOut)
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
      map((res) => {
        const user = JSON.parse(
          this.crypto.decrypt(
            res.toString(),
            this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
          )
        );
        if (user.data && user.data.access_token) {
          const currentUser: User = {
            apellido_materno: user.data.apellido_materno,
            apellido_paterno: user.data.apellido_paterno,
            username: login,
            nombre: user.data.nombre_personal,
            id: user.data.id_personal,
          };

          this.storage.setCookie(
            "1604e4ec4971ff5ace5fa1a099797ffa1",
            user.data.kescope,
            1
          );
          this.storage.setCookie(
            "1604e4ec4971ff5ace5fa2a099797ffa2",
            user.data.access_token,
            1
          );

          this.storage.setCookie(
            "zxc21dsrty5uyj11j1",
            this.crypto.encrypt(
              JSON.stringify(currentUser),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            ),
            1
          );

          // notify
          this.currentUserSubject.next(currentUser);
        }

        return user;
      }),
      catchError((err) => {
        console.log("Error", err);
        var message = "";
        if (err.error) {
          try {
            var jsonData = JSON.parse(
              this.crypto.decrypt(
                err.error,
                this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
              )
            );
            // console.log('Data de error recuperada:', jsonData);
            if (jsonData["message"]) {
              message = jsonData["message"] as string;
            }
          } catch (error) {
            console.log("Error al obtener captura de mensaje de error", error);
          }
        }
        throw Error(message);
      })
    );
  }

  getToken() {
    return this._backOfficeService.getTokenCognito().pipe(
      map((cognito: Cognito) => {
        this.storage.setCookie(
          "1604e4ec4971ff5ace5fa2a099797ffa2",
          cognito.access_token,
          1
        );
        this.storage.setCookie(
          "1604e4ec4971ff5ace5fa1a099797ffa1",
          cognito.kescope,
          1
        );
        return cognito;
      }),
      catchError((error) => {
        console.log("Caught search error the wrong way!");
        console.log(error);
        return of(null);
      })
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    return this._backOfficeService.logout().pipe(
      map((res) => {
        this.storage.deleteAllCookies();
        return res;
      }),
      catchError((error) => {
        console.log("Caught search error ddd the wrong way!");
        console.log(error);
        return of(null);
      })
    );

    // notify
    this.currentUserSubject = new BehaviorSubject({} as User);
  }
}
