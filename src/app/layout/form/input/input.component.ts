import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl("");
  @Input() type: string = "text";
  @Input() label: string = "";
  @Input() maxLength: string = "40";
  @Input() placeholder: string = "";
  @Input() autocomplete: string = "on";
  @Input("m") mask: string = "";

  visible = false;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  toggleVisible() {
    this.visible = !this.visible;
  }

  constructor() {}

  ngOnInit(): void {}

  showMsg() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
