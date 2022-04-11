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
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { throttle } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";
import { scan, debounce } from "rxjs/operators";
import {
  EmpresaResponse,
  ListaEmpresaResponse,
} from "src/app/models/home/empresa";
import { TarifaResponseData } from "src/app/models/home/tarifas";
import { ListaParienteResponseData } from "src/app/models/home/pariente";
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
  public enterpriseSelected: string;
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
  constructor(
    private storage: StorageService,
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

    this.acceptPolicies = true;
    this.additionalPurposes = false;
    this.documentSelected = "";
    this.enterpriseSelected = "";

    this.afiliado = new FormGroup({
      documento: new FormControl(""),
      tipoDocumento: new FormControl("1"),
      apellidoPaterno: new FormControl(""),
      apellidoMaterno: new FormControl(""),
      nombres: new FormControl(""),
      sexo: new FormControl("1"),
      estadoCivil: new FormControl(""),
      fechaNacimiento: new FormControl(""),
      correo: new FormControl(""),
      telefono: new FormControl(""),
      localidadId: new FormControl(""),
      localidad: new FormControl(""),
      direccion: new FormControl(""),
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

  cambiarEmpresa(value: string | string[]) {
    console.log(value);
    const selected = this.listaEmpresas.find(
      (el) => el.id_empresa == Number(value)
    );
    if (!selected) return;
    this.programsService.getTarifa(selected?.tarifa).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.listaTarifas = res.data;

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

  addPariente() {
    this.parientes.push(
      new FormGroup({
        parentesco: new FormControl("1"),
        documento: new FormControl(""),
        tipoDocumento: new FormControl("1"),
        apellidoPaterno: new FormControl(""),
        apellidoMaterno: new FormControl(""),
        nombres: new FormControl(""),
        sexo: new FormControl("1"),
        fechaNacimiento: new FormControl(""),
        correo: new FormControl(""),
        telefono: new FormControl(""),
        localidad: new FormControl(""),
        localidadId: new FormControl(""),
        direccion: new FormControl(""),
        estadoFumador: new FormControl("1"),
        estadoEnfermedadOncologica: new FormControl("1"),
      })
    );
  }

  removePariente(index: number) {
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
    console.log(date);
    console.log(monthDiff);
    console.log(ageDt);
    console.log(year);
    console.log(age);
    console.log(listaTarifas);
    return listaTarifas.find(
      (el) => Number(el.minimo) <= age && age <= Number(el.maximo)
    )?.valor;
  }

  ngAfterViewInit(): void {
    console.log("this.localidadesInput");
    if (this.localidadesInput) {
      this.debounceKeypress(this.localidadesInput.nativeElement, () => {
        this.buscarLocalidades(this.localidadesInput?.nativeElement.value);
      });
    }
  }

  ngOnInit(): void {
    if (this.planes.length == 0) {
      this.getPlanes();
      return;
    }
    this.getPlan();
    if (this.plan) {
      this.programsService.getEmpresas(this.plan.id).subscribe((res) => {
        console.log(res);
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
      console.log(res);
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
      console.log(event);
      event.stopPropagation();
    }
  }

  getPlan() {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (!params["id"] || !this.planes.find((el) => el.id == params["id"])) {
        this.router.navigate(["/"]);
        return;
      }

      const currentPlan = this.planes.find((el) => el.id == params["id"]);
      if (currentPlan) {
        this.plan = currentPlan;
      }
      console.log(this.plan);
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
    console.log(this.documentSelected);
    this.loadingUsuario = true;
    this.programsService
      .buscarUsuario(
        this.afiliado.get("tipoDocumento").value,
        this.afiliado.get("documento").value
      )
      .subscribe(
        (res) => {
          console.log(res);
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
                res.data.fecha_nacimiento.split("/").reverse().join("-")
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
