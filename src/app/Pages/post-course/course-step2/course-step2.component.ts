import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-step2',
  templateUrl: './course-step2.component.html',
  styleUrls: ['./course-step2.component.css']
})
export class CourseStep2Component implements OnInit {
  hasAptitudeTest = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }
  instituteId: number;
  courseId: number;
  form: FormGroup;
  touched = false;

  paymentTenures;
  bankDetails;
  totalFee: number;
  nspotFeeObj = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
  ngOnInit(): void {
    this.courseId = _.parseInt(this.route.snapshot.paramMap.get('courseId'));
    this.instituteId = this.authService.instituteProfile.id;
    this.loadData();
    this.form = this.formBuilder.group({
      instituteCourseId: [this.courseId, [Validators.required]],
      paymentTenureId: ['', [Validators.required]],
      // applicationFee: [0, [Validators.required]],
      // donation: [0, [Validators.required]],
      // admissionFee: [0, [Validators.required]],
      // tutionFee: [0, [Validators.required]],
      // vanFee: [0, [Validators.required]],
      // uniformFee: [0, [Validators.required]],
      // tax: [0, [Validators.required]],
      otherFee: [0, [Validators.required]],
      // nspotServiceCharge: ['', [Validators.required]],
      // nspotBankCharge: ['', [Validators.required]],
      // nspotTax: ['', [Validators.required]],
      bankAccountId: ['', [Validators.required]],
      hasScolarship: [false],
      spotfee: ['',[Validators.required]],
      // title: [''],
      amount: [''],
      refundPolicy: ['',[Validators.required]],
    });
    this.calculateTotalFee();
  }

  loadData(): void {
    this.apiService.doGetRequest(endPoints.Get_paymentTenures).subscribe((returnData: any) => {
      this.paymentTenures = returnData.data;
      console.log(this.paymentTenures);
    });
    this.apiService.doGetRequest(endPoints.Get_bankDetails + this.instituteId).subscribe((returnData: any) => {
      this.bankDetails = returnData.data;
      console.log(this.bankDetails);
    });

  }

  // calculating the total fee
  calculateTotalFee(): void {
    const formData = this.form.value;
    // console.log(formData)
    // const applicationFee = _.parseInt(formData.applicationFee);
    // const donation = _.parseInt(formData.donation);
    // const admissionFee = _.parseInt(formData.admissionFee);
    // const tutionFee = _.parseInt(formData.tutionFee);
    // const vanFee = _.parseInt(formData.vanFee);
    // const uniformFee = _.parseInt(formData.uniformFee);
    // const tax = _.parseInt(formData.tax);
    const otherFee = _.parseInt(formData.otherFee);
    // alert(applicationFee);
    // this.totalFee = applicationFee + donation + admissionFee + tutionFee + vanFee + uniformFee + tax + otherFee;
    this.totalFee = otherFee;
  }

  // calculate the nspot fee
  calculateNspotFee(): void {
    this.apiService.doGetRequest(endPoints.Calculate_NspotFee + this.totalFee).subscribe((returnData: any) => {
      // console.log(returnData);
      this.nspotFeeObj = returnData.data;
    });
  }

  // submitting the multipart data to the api
  onSubmit(): void {
    console.log(this.form.valid)
    console.log(document.getElementsByClassName('ng-invalid'))
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    console.log(this.nspotFeeObj.nspotFee+this.nspotFeeObj.bankCharge+this.nspotFeeObj.nspotTax);
    let totalamount = this.nspotFeeObj.nspotFee+this.nspotFeeObj.bankCharge+this.nspotFeeObj.nspotTax;
    let spotaddmionchangres = this.form.value.spotfee;
    console.log(spotaddmionchangres);
    
    if(totalamount>spotaddmionchangres)
    {
      this.toastr.error("Spot addmission fee is less than Nspot fee")
    }
    else{
  this.apiService.doPostRequest(endPoints.Create_courseFee + this.instituteId, formData)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Form submission successfull');
        this.router.navigate(['/institute/post/course/step-3/' + this.courseId]);
      },
        error => {
          this.toastr.error(error.error[0].message);
          console.error(error);
        });
    }
  


  }
  get f() { return this.form.controls; }

}
