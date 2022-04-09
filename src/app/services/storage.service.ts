import { Injectable } from "@angular/core";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private crypto: SharedService) {}

  /*sendDataToStorage(
    data: Object,
    storageName: string,
    storage: Storage = localStorage
  ) {
    storage &&
      storage.setItem(storageName, this.crypto.encrypt(JSON.stringify(data),storage.getCookie("5ebe2294ecd0e0f08eab7690d2a6ee69")));
  }

  resetDataFromStorage(storageName: string, storage: Storage = localStorage) {
    storage && storage.setItem(storageName, "");
  }

  getDataFromStorage(storageName: string, storage: Storage = localStorage) {
    const data = storage.getItem(storageName)
      ? // @ts-ignore
        this.crypto.decrypt(storage.getItem(storageName),this.storage.getCookie("5ebe2294ecd0e0f08eab7690d2a6ee69"))
      : null;

    if (typeof data === "string") {
      return JSON.parse(data);
    }
    return null;
  }*/
  setCookie(cname: any, cvalue: any, exdays: any) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax";
  }
 
  getCookie(cname: any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
