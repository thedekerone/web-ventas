import { Component, Input, OnInit } from "@angular/core";
import { Plan } from "src/app/models/home/program";
import { programsService } from "src/app/services/programs.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.scss"],
})
export class ProgramComponent implements OnInit {
  @Input()
  programNode!: Plan;

  constructor() {}

  ngOnInit(): void {}
}
