import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Plan } from "src/app/models/home/program";
import { Select2OptionData } from "ng-select2";
import { StorageService } from "src/app/services/storage.service";
import { SharedService } from "src/app/services/shared.service";
import { programsService } from "src/app/services/programs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { throttle } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";
import { scan, debounce } from "rxjs/operators";
import {
  EmpresaResponse,
  ListaEmpresaResponse,
} from "src/app/models/home/empresa";
import { TarifaResponseData } from "src/app/models/home/tarifas";
import { ListaParienteResponseData } from "src/app/models/home/pariente";
import { AfiliadoProps, AfiliadoResponse } from "src/app/models/home/afiliado";
import { AuthenticationService } from "src/app/auth/services/authentication.service";
@Component({
  selector: "app-membership",
  templateUrl: "./membership.component.html",
  styleUrls: ["./membership.component.scss"],
})
export class MembershipComponent implements OnInit, AfterViewInit {
  //Public
  @ViewChild("localidadesInput") localidadesInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  public plan: Plan = {
    id: 0,
    link: "",
    logo: "",
    title: "",
    specifications: [],
  };
  searched = false;
  loadingUsuario = false;

  step = 1;
  acceptPolicies2 = false;

  public acceptPolicies: Boolean;
  public additionalPurposes: Boolean;
  //Public - Select2 Documents
  public documents: Array<Select2OptionData>;
  public documentSelected: string;
  //Public - Select2 Enterprise
  public enterprises: Array<Select2OptionData>;
  localidadesOpen = false;
  parienteLocalidad = {};
  planes: Plan[];
  public banners: {
    id: number;
    image: string;
    link: string;
    icon: string;
    text: string;
  }[] = [];
  price = 0;
  localidades: { id: string; text: string }[] = [];
  estadoCivil: { id: string; text: string }[];
  afiliado: any;
  listaEmpresas: EmpresaResponse[] = [];
  listaTarifas: TarifaResponseData[] = [];
  parientes: any;
  listaPariente: { id: string; text: string }[] = [];
  nacionalidades: { id: string; text: string }[] = [];
  constructor(
    private storage: StorageService,
    private user: AuthenticationService,
    private crypto: SharedService,
    private programsService: programsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.planes = this.storage.getCookie("planes")
      ? JSON.parse(
          this.crypto.decrypt(
            this.storage.getCookie("planes"),
            this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
          )
        )
      : [];

    this.acceptPolicies = false;
    this.additionalPurposes = false;
    this.documentSelected = "";

    this.afiliado = new FormGroup({
      empresa: new FormControl("", [Validators.required]),
      documento: new FormControl("", [Validators.required]),
      tipoDocumento: new FormControl("1"),
      apellidoPaterno: new FormControl("", [Validators.required]),
      apellidoMaterno: new FormControl(""),
      nombres: new FormControl("", [Validators.required]),
      sexo: new FormControl("1", [Validators.required]),
      estadoCivil: new FormControl("", [Validators.required]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      correo: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-ZñÑÀ-ÿ#.,&@0-9-_ ]*$"),
      ]),
      telefono: new FormControl("", [Validators.required]),
      localidadId: new FormControl(""),
      localidad: new FormControl(""),
      nacionalidad: new FormControl(""),
      direccion: new FormControl("", [Validators.required]),
      estadoFumador: new FormControl("1"),
      estadoEnfermedadOncologica: new FormControl("1"),
      estadoAfiliar: new FormControl("1"),
    });
    this.parientes = new FormArray([]);

    this.documents = [
      { id: "1", text: "DNI" },
      { id: "2", text: "CEX" },
      { id: "3", text: "RUC" },
      { id: "4", text: "PASAPORTE" },
      { id: "5", text: "PNI" },
      { id: "6", text: "OTROS" },
    ];
    this.estadoCivil = [
      { id: "1", text: "Soltero" },
      { id: "2", text: "Casado" },
    ];
    this.enterprises = [];
  }

  getDocumentMask(type: number) {
    if (type == 1) {
      return "00000000";
    } else if (type == 2) {
      return "000000000";
    } else if (type == 3) {
      return "00000000000";
    } else {
      return "0*";
    }
  }

  getNombreUsuario() {
    return this.user.currentUserValue.nombre;
  }

  cambiarEmpresa(value: string | string[]) {
    const selected = this.listaEmpresas.find(
      (el) => el.id_empresa == Number(value)
    );
    if (!selected) return;
    this.programsService
      .getTarifa(selected?.tarifa, this.plan.id)
      .subscribe((res) => {
        if (res.success) {
          this.listaTarifas = res.data;
          console.log(this.listaTarifas);
          if (this.afiliado.get("fechaNacimiento").value) {
            this.price =
              this.getPrice(
                this.listaTarifas,
                this.afiliado.get("fechaNacimiento").value
              ) || 0;
          }
        }
      });
  }

  getAfiliadoParams(
    afiliado: any,
    id_cliente_principal: number = 0
  ): AfiliadoProps {
    return {
      apellido_materno: afiliado.get("apellidoMaterno").value,
      apellido_paterno: afiliado.get("apellidoPaterno").value,
      condicion_fumador: afiliado.get("estadoFumador").value,
      correo: afiliado.get("correo").value,
      direccion: afiliado.get("direccion").value,
      enfermedad_oncologica: afiliado.get("estadoEnfermedadOncologica").value,
      estado_civil: afiliado.get("estadoCivil")?.value ?? "CASADO",
      fecha_nacimiento: afiliado.get("fechaNacimiento").value,
      fines_adicionales: 1,
      id_cliente_principal: id_cliente_principal,
      id_nacionalidad: afiliado.get("nacionalidad").value,
      id_parentesco: afiliado.get("parentesco")?.value ?? 0,
      localidad: afiliado.get("localidad").value,
      nombres: afiliado.get("nombres").value,
      nro_documento: afiliado.get("documento").value,
      politicas_privacidad: this.acceptPolicies ? 1 : 0,
      sexo: afiliado.get("sexo").value,
      telefono: afiliado.get("telefono").value,
      terminos_condiciones: this.acceptPolicies2 ? 1 : 0,
      tipo_documento: afiliado.get("tipoDocumento").value,
    };
  }

  continuar(hasAfiliados = false) {
    console.log("Dasds");
    if (this.afiliado.invalid) return;
    console.log("Dasds");
    if (this.afiliado.get("estadoAfiliar").value == 1 && !hasAfiliados) {
      this.changeStep(2);
    } else {
      console.log("Dasds2");
      if (!this.acceptPolicies2) return;
      console.log("Dasds3");

      this.programsService
        .registrarAfiliado(this.getAfiliadoParams(this.afiliado))
        .subscribe((afiliado) => {
          console.log(afiliado);

          if (afiliado.success) {
            this.programsService.registrarReserva().subscribe((reserva) => {
              console.log(reserva);

              this.programsService
                .registrarAfiliacion(
                  JSON.parse(afiliado.data).id_cliente,
                  this.plan.id,
                  this.price
                )
                .subscribe((res) => {
                  console.log(res);
                });
            });
          }

          if (afiliado.success && hasAfiliados) {
            this.registrarParientes(afiliado);
          }
        });
    }
  }

  registrarParientes(res: AfiliadoResponse) {
    this.parientes.controls.map((pariente: any) => {
      this.programsService
        .registrarAfiliado(
          this.getAfiliadoParams(pariente, JSON.parse(res.data).id_cliente)
        )
        .subscribe((beneficiario) => {
          this.programsService.registrarReserva().subscribe((reserva) => {
            console.log(reserva);

            this.programsService
              .registrarAfiliacion(
                JSON.parse(beneficiario.data).id_cliente,
                this.plan.id,
                this.price
              )
              .subscribe((res) => {
                console.log(res);
              });
          });
        });
    });
  }

  addPariente() {
    const nacimiento = new FormControl("");

    nacimiento.valueChanges.subscribe((res: any) => {
      this.changeNacimiento();
    });
    this.parientes.push(
      new FormGroup({
        parentesco: new FormControl("1"),
        documento: new FormControl(""),
        tipoDocumento: new FormControl("1"),
        apellidoPaterno: new FormControl(""),
        apellidoMaterno: new FormControl(""),
        nombres: new FormControl(""),
        sexo: new FormControl("1"),
        fechaNacimiento: nacimiento,
        correo: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-ZñÑÀ-ÿ#.,&@0-9-_ ]*$"),
        ]),
        telefono: new FormControl(""),
        localidad: new FormControl(""),
        localidadId: new FormControl(""),
        nacionalidad: new FormControl(""),
        direccion: new FormControl(""),
        estadoFumador: new FormControl("1"),
        estadoEnfermedadOncologica: new FormControl("1"),
      })
    );
  }

  removePariente(index: number) {
    console.log(this.parientes.controls);
    if (this.parientes.controls[index].get("fechaNacimiento")) {
      const newPrice = this.getPrice(
        this.listaTarifas,
        this.parientes.controls[index].get("fechaNacimiento").value
      );
      if (newPrice) {
        this.price -= newPrice;
      }
    }
    this.parientes.removeAt(index);
  }

  getDecimal(value: number) {
    return (value - Math.trunc(value)) * 100;
  }

  getTrunc(value: number) {
    return Math.trunc(value);
  }

  getPrice(listaTarifas: TarifaResponseData[], date: string) {
    const birthday = new Date(date);
    const monthDiff = Date.now() - birthday.getTime();

    const ageDt = new Date(monthDiff);

    const year = ageDt.getUTCFullYear();

    const age = Math.abs(year - 1970);

    return listaTarifas.find(
      (el) => Number(el.minimo) <= age && age <= Number(el.maximo)
    )?.valor;
  }

  ngAfterViewInit(): void {
    if (this.localidadesInput) {
      this.debounceKeypress(this.localidadesInput.nativeElement, () => {
        this.buscarLocalidades(this.localidadesInput?.nativeElement.value);
      });
    }
  }

  ngOnInit(): void {
    this.afiliado.get("fechaNacimiento").valueChanges.subscribe((res: any) => {
      console.log(res);
      this.changeNacimiento();
    });

    this.programsService.getNacionalidades().subscribe((res) => {
      console.log(res);
      this.nacionalidades = res.data.map((nacionalidad) => ({
        id: nacionalidad.id_nacionalidad + "",
        text: nacionalidad.pais,
      }));
    });
    if (this.planes.length == 0) {
      this.getPlanes();
      return;
    }
    this.getPlan();
    if (this.plan) {
      this.programsService.getEmpresas(this.plan.id).subscribe((res) => {
        if (res.success) {
          this.enterprises = res.data.map((empresa) => {
            return {
              id: empresa.id_empresa + "",
              text: empresa.razon_social,
            };
          });
          this.listaEmpresas = res.data;
        }
      });
    }
    this.programsService.getListaPariente().subscribe((res) => {
      if (res) {
        this.listaPariente = res.data.map((el) => ({
          id: el.id_parentesco + "",
          text: el.nombre,
        }));
      }
    });
    this.afiliado.get("localidad").disable();
  }

  changeStep(step: number) {
    this.step = step;
  }

  changeNacimiento() {
    console.log("dadaas");
    console.log(this.afiliado.get("fechaNacimiento").value);
    if (
      this.afiliado.get("fechaNacimiento").value &&
      this.listaTarifas.length > 0
    ) {
      this.price =
        this.getPrice(
          this.listaTarifas,
          this.afiliado.get("fechaNacimiento").value
        ) || 0;
    }
    this.parientes.controls.map((el: any) => {
      if (el.get("fechaNacimiento").value && this.listaTarifas.length > 0) {
        this.price +=
          this.getPrice(this.listaTarifas, el.get("fechaNacimiento").value) ||
          0;
      }
    });
  }

  debounceKeypress(element: HTMLInputElement, callback?: () => void) {
    if (!element) return;

    const keyup = fromEvent(element, "keyup");
    const result = keyup.pipe(
      scan((i) => ++i, 1),
      debounce((i) => interval(300))
    );
    // keyup.subscribe((a) => {
    //   this.localidadesOpen = false;
    // });
    result.subscribe((x) => {
      callback && callback();
    });
  }

  buscarLocalidades(search: string = "") {
    this.programsService.getLocalidad(search).subscribe((res) => {
      this.localidadesOpen = true;
      this.localidades = res.data.map((localidad) => {
        return {
          id: localidad.idubigeo + "",
          text:
            localidad.departamento +
            ", " +
            localidad.provincia +
            ", " +
            localidad.distrito,
        };
      });
    });
  }

  handleFocusLocalidades(status: boolean, event?: any) {
    this.localidadesOpen = status;
    if (status && event) {
      event.stopPropagation();
    }
  }

  getPlan() {
    this.route.params.subscribe((params) => {
      if (!params["id"] || !this.planes.find((el) => el.id == params["id"])) {
        this.router.navigate(["/"]);
        return;
      }

      const currentPlan = this.planes.find((el) => el.id == params["id"]);
      if (currentPlan) {
        this.plan = currentPlan;
      }
    });
  }

  getPlanes() {
    this.programsService.getPrograms().subscribe((res) => {
      this.banners = res.data.map((el) => {
        return {
          id: el.id_programa,
          image: el.slider,
          link: "/programs",
          icon: el.icon,
          text: el.nombre_programa,
        };
      });
      this.planes = res.data
        .flatMap((el) => el.plan)
        .map((el) => {
          return {
            id: el.id_plan,
            link: "/programs",
            logo:
              this.banners.find((banner) => banner.id == el.id_programa)
                ?.icon ?? "",
            title: el.nombre_plan,
            banner: el.slider,
            specifications: el.plan_detalle.map((detalle) => {
              return {
                icon: detalle.icon,
                text: detalle.detalle,
                id: detalle.id_plan_detalle,
              };
            }),
          };
        });
      this.storage.setCookie(
        "planes",
        this.crypto.encrypt(
          JSON.stringify(this.planes),
          this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
        ),
        1
      );
      this.getPlan();
    });
  }

  onSearchInformation() {
    this.loadingUsuario = true;
    this.programsService
      .buscarUsuario(
        this.afiliado.get("tipoDocumento").value,
        this.afiliado.get("documento").value
      )
      .subscribe(
        (res) => {
          this.loadingUsuario = false;

          this.searched = true;
          if (res.success) {
            this.afiliado
              .get("apellidoPaterno")
              .setValue(res.data.apellido_paterno);
            this.afiliado
              .get("apellidoMaterno")
              .setValue(res.data.apellido_materno);
            this.afiliado.get("nombres").setValue(res.data.nombres_completos);
            this.afiliado
              .get("sexo")
              .setValue(res.data.sexo == "MASCULINO" ? "1" : "2");
            this.afiliado
              .get("estadoCivil")
              .setValue(res.data.estado_civil == "SOLTERO" ? "1" : "2");
            this.afiliado
              .get("fechaNacimiento")
              .setValue(
                new Date(
                  res.data.fecha_nacimiento.split("/").reverse().join("-")
                )
              );

            if (this.afiliado.get("fechaNacimiento").value) {
              this.price =
                this.getPrice(
                  this.listaTarifas,
                  this.afiliado.get("fechaNacimiento").value
                ) || 0;
            }
          }
        },
        (error) => {
          this.loadingUsuario = false;
          this.searched = true;
        }
      );
  }
}
