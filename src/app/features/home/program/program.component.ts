import { Component, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/models/home/program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  @Input()
  programNode!: Program;

  constructor() {
  }

  ngOnInit(): void {
  }

}
