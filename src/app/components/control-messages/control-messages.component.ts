import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { messages } from '../../config/constants';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css'],
})
export class ControlMessagesComponent implements OnInit {
  @Input() public control: FormControl;
  @Input() public touched: boolean;
  constructor() { }

  public ngOnInit(): void {
  }

  get errorMessage(): string | null {
    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return messages.validation[propertyName];
        } else if (this.touched && this.control.errors.hasOwnProperty(propertyName)) {
          console.log(propertyName)
          return messages.validation[propertyName];
        }
      }
    }
    return null;
  }
}
