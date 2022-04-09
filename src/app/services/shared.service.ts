import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public secretKey: string;
  constructor() {
    this.secretKey = environment.secretKey;
  }

  encrypt(value: string, secretValue: string = this.secretKey): string {
    return CryptoJS.AES.encrypt(value, secretValue.trim()).toString();
  }

  decrypt(textToDecrypt: string, secretValue: string = this.secretKey) {
    return CryptoJS.AES.decrypt(textToDecrypt, secretValue.trim()).toString(
      CryptoJS.enc.Utf8
    );
  }
}
