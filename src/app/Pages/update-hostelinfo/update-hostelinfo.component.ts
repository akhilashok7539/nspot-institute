import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-hostelinfo',
  templateUrl: './update-hostelinfo.component.html',
  styleUrls: ['./update-hostelinfo.component.css']
})
export class UpdateHostelinfoComponent implements OnInit {
  form: FormGroup;
  touched = false;
  instituteId;
  feesInfoHostel:any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.instituteId = this.authService.userProfile.userType;

    this.feesInfoHostel = JSON.parse(sessionStorage.getItem("feeandinfo"));
    this.form = this.formBuilder.group({
    
      haveBoysHostel: [false],
      haveGirlsHostel: [false],
      foodAvailableAtHostel: [false],
      hostalAnnualFee: [''],
      transportationInfo: ['', ],
  
    });
    this.form.controls['haveBoysHostel'].setValue(this.feesInfoHostel['haveBoysHostel']);
    this.form.controls['haveGirlsHostel'].setValue(this.feesInfoHostel['haveGirlsHostel']);
    this.form.controls['foodAvailableAtHostel'].setValue(this.feesInfoHostel['foodAvailableAtHostel']);
    this.form.controls['hostalAnnualFee'].setValue(this.feesInfoHostel['hostalAnnualFee']);
    this.form.controls['transportationInfo'].setValue(this.feesInfoHostel['transportationInfo']);


  }
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    console.log( this.form.value);
    
    this.apiService.doPutRequest(`institute/update/`+this.instituteId, this.form.value).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Updated Successfully');
        console.log(returnData)
        this.router.navigate([`/institute/dashboard`]);
      }
      else {
        this.toastr.error('Form submission failed.');
      }

    },
      error => {
        console.error(error);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        this.toastr.error("Something went wrong!");

      });

  }

  get f() { return this.form.controls; }
}
