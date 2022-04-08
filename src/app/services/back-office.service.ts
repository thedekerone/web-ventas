import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../auth/models/user";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: "root",
})
export class BackOfficeService {
  constructor(private http: HttpClient, private crypto: SharedService) {}

  getTokenCognito() {
    this.http
      .get(
        "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/outh2/token"
      )
      .subscribe((res) => console.log(res));
  }

  login(email: string, password: string) {
    const params = {
      username: email,
      password: password,
    };

    return this.http.post<User>(
      "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/login",
      this.crypto.encrypt(JSON.stringify(params))
    );
  }
}
