import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/auth/services/authentication.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _authenticationService: AuthenticationService,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {}
  logout() {
    this._authenticationService.logout().subscribe((res) => {
      this.storage.deleteAllCookies();
      window.location.reload();
    });
  }
}
