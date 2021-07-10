import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-additional-fields-form',
  templateUrl: './additional-fields-form.component.html',
  styleUrls: ['./additional-fields-form.component.css']
})
export class AdditionalFieldsFormComponent implements OnInit {
  @Input() public formSection: string;
  @Input() public fieldType: string;
  @Output() onSubmitFIlter = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  form: FormGroup;
  touched = false;
  instituteId = this.authService.instituteProfile.id;
  baseApiUrl = environment.baseApiUrl;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instituteId: [this.instituteId],
      formSection: [this.formSection],
      fieldName: ['', Validators.required],
      fieldText: ['', Validators.required],
      fieldType: [this.fieldType],
    })
  }

  createFieldName(fieldText: string) {
    const fieldName = fieldText.toLocaleLowerCase().trim().split("  ").join("").split(" ").join("-");
    this.form.controls.fieldName.setValue(fieldName);
  }

  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      const formData = this.form.value;
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');

      this.apiService.doPostRequest(
        endPoints.Create_additionalField,
        formData)
        .subscribe((returnData: any) => {
          console.log(returnData);
          if (returnData.status == true) {
            this.toastr.success('Additional field added');
            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.form.reset();
            this.onSubmitFIlter.emit(true);
          }
          else {

            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.toastr.error(returnData.error.message);
            this.form.reset();
            this.touched = false;
          }

        },
          error => {
            console.error(error);
            const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
            this.toastr.error(message);
            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.form.reset();
          });

    }

  }

  get f() { return this.form.controls; }
}
