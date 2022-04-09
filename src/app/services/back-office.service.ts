import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cognito } from "../auth/models/cognito";
import { User, UserResponse } from "../auth/models/user";
import { SharedService } from "./shared.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class BackOfficeService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private crypto: SharedService
  ) {}

  getTokenCognito() {
    return this.http.get<Cognito>(environment.lambda_cognito);
  }

  validateTokenExpired() {
    try {
      var dateExpires = new Date(
        parseInt(
          this.crypto.decrypt(this.storage.getCookie("expires_in"), "auna")
        )
      );
      var dateNow = new Date();
      if (dateExpires.getTime() >= dateNow.getTime()) {
        return true;
      } else {
        this.storage.deleteAllCookies();
        this.router.navigate(["/"]);
        return false;
      }
    } catch (error) {
      this.storage.deleteAllCookies();
      this.router.navigate(["/"]);
      return false;
    }
  }

  login(email: string, password: string) {
    const params = {
      username: email,
      password: password,
    };

    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http.post(`${environment.lambda_auth}/login`, userRequest, {
      headers: new HttpHeaders({
        "Content-Type": "text/plain; charset=utf-8",
        Authorization:
          this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
      }),
      responseType: "text" as "json",
    });
  }

  logout() {
    const params = {};

    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http.post<UserResponse>(
      `${environment.lambda_auth}/logout`,
      {},
      {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),
        responseType: "text" as "json",
      }
    );
  }
}
