import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() control: FormControl = new FormControl('');
  @Input() label: string = '';
  constructor() {}

  ngOnInit(): void {}

  showMsg() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
