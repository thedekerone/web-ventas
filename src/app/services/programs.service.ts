import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cognito } from "../auth/models/cognito";
import { User, UserResponse } from "../auth/models/user";
import { SharedService } from "./shared.service";
import { StorageService } from "./storage.service";
import { ListProgramsResponse } from "../core/types";
import { ListaEmpresaResponse } from "../models/home/empresa";
import { Usuario, UsuarioResponse } from "../models/usuario/users";
import { LocalidadResponse } from "../models/home/localidad";
import { TarifaResponse } from "../models/home/tarifas";
import { ListaParienteResponse } from "../models/home/pariente";
import { NacionalidadResponse } from "../models/home/nacionalidad";
import { AfiliadoProps, AfiliadoResponse } from "../models/home/afiliado";

@Injectable({
  providedIn: "root",
})
export class programsService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private crypto: SharedService
  ) {}

  getPrograms(): Observable<ListProgramsResponse> {
    return this.http
      .get<ListProgramsResponse>(environment.lambda_programs, {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),
        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
          var message = "";
          if (err.error) {
            try {
              var jsonData = JSON.parse(
                this.crypto.decrypt(
                  err.error,
                  this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
                )
              );
              if (jsonData["message"]) {
                message = jsonData["message"] as string;
              }
            } catch (error) {
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  getNacionalidades(): Observable<NacionalidadResponse> {
    return this.http
      .get<ListProgramsResponse>(environment.apiUrl + "/list/nationality", {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),
        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  getListaPariente(): Observable<ListaParienteResponse> {
    return this.http
      .get<ListaParienteResponse>(environment.apiUrl + "/list/relationship", {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),
        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }

  getEmpresas(id_plan: number): Observable<ListaEmpresaResponse> {
    const params = {
      id_plan,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<ListaEmpresaResponse>(environment.lambda_empresas, userRequest, {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),

        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  getLocalidad(buscador: string): Observable<LocalidadResponse> {
    const params = {
      buscador,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<LocalidadResponse>(
        `${environment.apiUrl}/list/ubigeo`,
        userRequest,
        {
          headers: new HttpHeaders({
            "Content-Type": "text/plain; charset=utf-8",
            Authorization:
              this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
          }),

          responseType: "text" as "json",
        }
      )
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  getTarifa(tarifa: string, id_plan: number): Observable<TarifaResponse> {
    const params = {
      tarifa,
      id_plan,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<TarifaResponse>(`${environment.apiUrl}/list/tariff`, userRequest, {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),

        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  searchEmpresa(
    ruc: string,
    usuario: string,
    aux: string
  ): Observable<TarifaResponse> {
    const params = {
      ruc,
      usuario,
      aux,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<TarifaResponse>(
        `${environment.apiUrl}/search/business`,
        userRequest,
        {
          headers: new HttpHeaders({
            "Content-Type": "text/plain; charset=utf-8",
            Authorization:
              this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
          }),

          responseType: "text" as "json",
        }
      )
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  buscarUsuario(
    tipo_documento: number,
    numero_documento: number
  ): Observable<UsuarioResponse> {
    const params = {
      tipo_documento,
      nro_documento: numero_documento,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<UsuarioResponse>(environment.lambda_usuario, userRequest, {
        headers: new HttpHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          Authorization:
            this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
        }),

        responseType: "text" as "json",
      })
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
  registrarReserva(bp_usuario: number = 60): Observable<UsuarioResponse> {
    const params = {
      bp_usuario,
    };
    var userRequest = this.crypto.encrypt(
      JSON.stringify(params),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<UsuarioResponse>(
        environment.apiUrl + "/search/reserve",
        userRequest,
        {
          headers: new HttpHeaders({
            "Content-Type": "text/plain; charset=utf-8",
            Authorization:
              this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
          }),

          responseType: "text" as "json",
        }
      )
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }

  registrarAfiliado(props: AfiliadoProps): Observable<AfiliadoResponse> {
    var userRequest = this.crypto.encrypt(
      JSON.stringify(props),
      this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
    );

    return this.http
      .post<AfiliadoResponse>(
        environment.apiUrl + "/register/affiliate",
        userRequest,
        {
          headers: new HttpHeaders({
            "Content-Type": "text/plain; charset=utf-8",
            Authorization:
              this.storage.getCookie("1604e4ec4971ff5ace5fa2a099797ffa2") || "",
          }),

          responseType: "text" as "json",
        }
      )
      .pipe(
        map((res) => {
          return JSON.parse(
            this.crypto.decrypt(
              res.toString(),
              this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
            )
          );
        }),
        catchError((err: HttpErrorResponse) => {
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
              // console.log('Error al obtener captura de mensaje de error', error);
            }
          }
          throw Error(message);
        })
      );
  }
}
