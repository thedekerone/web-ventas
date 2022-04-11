import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { debounce, fromEvent, interval, scan } from "rxjs";
import { programsService } from "src/app/services/programs.service";

@Component({
  selector: "app-select-localidades",
  templateUrl: "./select-localidades.component.html",
  styleUrls: ["./select-localidades.component.scss"],
})
export class SelectLocalidadesComponent implements OnInit, AfterViewInit {
  @ViewChild("localidadesInput") localidadesInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  @Input("control") control: any;
  @Input("currentLocalidad") currentLocalidad: any;
  isOpen: boolean = false;

  localidades: { id: string; text: string }[] = [];
  constructor(private programsService: programsService) {}

  ngOnInit(): void {
    this.control.disable();
    window.addEventListener("click", () => {
      this.isOpen = false;
    });
  }

  buscarLocalidades(search: string = "") {
    this.programsService.getLocalidad(search).subscribe((res) => {
      this.isOpen = true;
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

  handleFocus(status: boolean, event?: any) {
    this.isOpen = status;
    if (status && event) {
      console.log(event);
      event.stopPropagation();
    }
  }

  selectLocalidad(localidad: { id: string; text: string }, event: any) {
    console.log(localidad);
    this.currentLocalidad.setValue(localidad.id);
    this.isOpen = false;
    this.control.setValue(localidad.text);
    event.stopPropagation();
  }

  debounceKeypress(element: HTMLInputElement, callback?: () => void) {
    if (!element) return;

    const keyup = fromEvent(element, "keyup");
    const result = keyup.pipe(
      scan((i) => ++i, 1),
      debounce((i) => interval(300))
    );

    result.subscribe((x) => {
      callback && callback();
    });
  }

  ngAfterViewInit(): void {
    console.log("this.localidadesInput");
    if (this.localidadesInput) {
      this.debounceKeypress(this.localidadesInput.nativeElement, () => {
        this.buscarLocalidades(this.localidadesInput?.nativeElement.value);
      });
    }
  }
}
