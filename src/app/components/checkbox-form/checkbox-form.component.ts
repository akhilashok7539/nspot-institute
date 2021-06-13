import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.css']
})
export class CheckboxFormComponent implements OnInit {
  @Input() formControl;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.formControl.key].valid; }
  constructor() { }

  ngOnInit(): void {
  }

}
