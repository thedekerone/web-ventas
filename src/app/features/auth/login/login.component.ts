import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/auth/services/authentication.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { BackOfficeService } from "src/app/services/back-office.service";
import { User } from "src/app/auth/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  //Public
  public returnUrl: string;
  public msgResponse: string;
  public email: string;
  public password: string;
  public passwordType: string;
  public passwordIcon: string;
  public errorEmail: Boolean;
  public errorPassword: Boolean;
  public fieldsDisabled: boolean;

  /**
   *
   * @param {AuthenticationService} _authenticationService
   * @param {Router} _router
   * @param {ActivatedRoute} _route
   */
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _backOfficeService: BackOfficeService
  ) {
    this.returnUrl = "/";
    this.msgResponse = "";
    this.email = "";
    this.password = "";
    this.passwordType = "password";
    this.passwordIcon = "fa fa-eye";
    this.errorEmail = false;
    this.errorPassword = false;
    this.fieldsDisabled = false;
  }

  /**
   * ngOnInit Method
   */
  ngOnInit(): void {
    this._authenticationService.logout().subscribe();
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
    if (this.loginActive) {
      this._router.navigate([this.returnUrl]);
    }
    this._authenticationService.getToken().subscribe();
  }

  /**
   * showPassword Method : Change the field type.
   */
  showPassword() {
    if (this.passwordType === "password") {
      this.passwordIcon = "fa fa-eye";
      this.passwordType = "text";
    } else {
      this.passwordIcon = "fa fa-eye-slash";
      this.passwordType = "password";
    }
  }

  /**
   * onLogin Method : Form Submit
   */
  onLogin() {
    if (this.email == "") {
      this.errorEmail = true;
      return;
    }

    if (!this.validateEmail(this.email.toString())) {
      this.errorEmail = true;
      return;
    }

    this.errorEmail = false;

    if (this.password == "") {
      this.errorPassword = true;
      return;
    }

    this.errorPassword = false;
    this.fieldsDisabled = true;

    this._authenticationService
      .login(this.email.toString(), this.password.toString())
      .subscribe((res) => {
        console.log(res);
        if (res.success) {
          this._router.navigate([this.returnUrl]);
        } else {
          this.msgResponse = "Usuario no encontrado.";
          this.fieldsDisabled = false;
        }
      });
  }

  /**
   * onLogin Method : Form Submit
   */
  validateEmail(valor: string) {
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        valor
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * get loginActive Method
   */
  public get loginActive(): Boolean {
    if (this._authenticationService.currentUserValue.id) {
      return true;
    } else {
      return false;
    }
  }
}
