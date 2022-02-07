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
  courseDuration;
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
  hasgstvalue = false;
  paymentTenures;
  bankDetails;
  totalFee: number;
  nspotFeeObj = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
  nspotFeeObjNri = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
    tdscalculation ;
    tdscalculationnri;
  ngOnInit(): void {
    this.courseId = _.parseInt(this.route.snapshot.paramMap.get('courseId'));
    this.courseDuration = JSON.parse(sessionStorage.getItem("courseDuration"));
    console.log(this.courseDuration);

    this.instituteId = this.authService.instituteProfile.id;
    this.loadData();
    this.form = this.formBuilder.group({
      instituteCourseId: [this.courseId, [Validators.required]],
      // paymentTenureId: ['', [Validators.required]],
      // // applicationFee: [0, [Validators.required]],
      // // donation: [0, [Validators.required]],
      // // admissionFee: [0, [Validators.required]],
      // // tutionFee: [0, [Validators.required]],
      // // vanFee: [0, [Validators.required]],
      // // uniformFee: [0, [Validators.required]],
      // // tax: [0, [Validators.required]],
      // otherFee: [0, [Validators.required]],
      // // nspotServiceCharge: ['', [Validators.required]],
      // // nspotBankCharge: ['', [Validators.required]],
      // // nspotTax: ['', [Validators.required]],
      // bankAccountId: ['', [Validators.required]],
      // hasScolarship: [false],
      // spotfee: ['',[Validators.required]],

      // otherincludes: [''],
      // amount: [''],
      // refundPolicy: ['',[Validators.required]],
      // // validUpto: ['null'],
      // // title: ['tittlenull'],
      paymentTenureId: ['',[Validators.required]],
      otherIncludes: ['',[Validators.required]],
      otherFee: [0,[Validators.required]],
      otherexcludes: ['',[Validators.required]],
      bankAccountId: ['',[Validators.required]],
      hasScolarship: [false],
      hasScolarshipNri: [false],
      amount: [''],
      spotfee: ['',[Validators.required]],
      amountcreditedInstitute: [''],
      refundPolicy: ['',[Validators.required]],
      // nriOtherexcludes: ['',],
      nriotherFee: [''],
      nrischlorshipamount: [''],
      nriSpotfee: ['',[Validators.required]],
      nriAmountCreditedinstitute: ['',[Validators.required]],
      nripaymentTenureId: [''],
      nrirefundPolicy: [''],
      nriOtherIncludes: [''],
      feeexcludesNri: [''],
      nspotTaxNri: [''],
      nspotTax: [''],
      nspotServiceChargeNri: [''],
      nspotServiceCharge: [''],
      nspotBankChargenNri: [''],
      nspotBankCharge: [''],
      hasGst: ['']
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
      this.form.controls['nspotTax'].setValue(this.nspotFeeObj.nspotTax);
      this.form.controls['nspotServiceCharge'].setValue(this.nspotFeeObj.nspotFee);
      this.form.controls['nspotBankCharge'].setValue(this.nspotFeeObj.bankCharge);
    });
  }
  calculateNspotFeeNri(): void {
    const formData = this.form.value;
    const otherFee = _.parseInt(formData.nriotherFee);
    let totalfeesnri = otherFee;
    this.apiService.doGetRequest(endPoints.Calculate_NspotFee + totalfeesnri).subscribe((returnData: any) => {
      this.nspotFeeObjNri = returnData.data;
      this.form.controls['nspotTaxNri'].setValue(this.nspotFeeObjNri.nspotTax);
      this.form.controls['nspotServiceChargeNri'].setValue(this.nspotFeeObjNri.nspotFee);
      this.form.controls['nspotBankChargenNri'].setValue(this.nspotFeeObjNri.bankCharge);
    });
  }
  keyupevent1(event) {
    // console.log(event.target.value);
    // let amoutncredited = event.target.value - this.nspotFeeObj.nspotFee
    // console.log(amoutncredited);
    // this.form.controls['amountcreditedInstitute'].setValue(amoutncredited)
    // if(event.target.value >=this.nspotFeeObj.nspotFee )
    // {
    //   let amoutncredited = event.target.value - this.nspotFeeObj.nspotFee
    //   console.log(amoutncredited);
    //   this.form.controls['amountcreditedInstitute'].setValue(amoutncredited)
    // }

  }
  calculateCredited() {
    console.log(this.form.value.hasGst); 
    if(this.form.value.hasGst === false)
    {
     
      
      let amoutncredited = this.form.value.spotfee - this.nspotFeeObj.nspotFee 
      console.log(this.nspotFeeObj.nspotFee,this.form.value.spotfee,amoutncredited);
      this.form.controls['amountcreditedInstitute'].setValue(amoutncredited)
    }
    else{
      this.tdscalculation = 1/100 * this.form.value.spotfee;
      console.log("tds",this.tdscalculation);
      let amoutncredited = this.form.value.spotfee - this.nspotFeeObj.nspotFee- this.tdscalculation
      this.form.controls['amountcreditedInstitute'].setValue(amoutncredited)

    }
   
  }
  calculateamountCredited()
  {
    console.log(this.form.value.hasGst);
    if(this.form.value.hasGst === false)
    {
    let amoutncrediteds = this.form.value.nriSpotfee - this.nspotFeeObjNri.nspotFee 
    console.log(this.form.value.nriSpotfee ,this.nspotFeeObjNri.nspotFee ,amoutncrediteds);
    this.form.controls['nriAmountCreditedinstitute'].setValue(amoutncrediteds)
    }
    else{
      this.tdscalculationnri = 1/100 * this.form.value.nriSpotfee;
      console.log("tds",this.tdscalculationnri);
      let amoutncrediteds = this.form.value.nriSpotfee - this.nspotFeeObjNri.nspotFee- this.tdscalculationnri
      this.form.controls['nriAmountCreditedinstitute'].setValue(amoutncrediteds)

    }
  }
  keyupevent2(event) {
    console.log(event.target.value);
    // let value = 
    // this.form.controls['nriAmountCreditedinstitute'].setValue(response.isFilingGst)

  }
  // submitting the multipart data to the api
  onSubmit(): void {
    console.log(this.form.valid)
    // console.log(document.getElementsByClassName('ng-invalid'))
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
  
    const formData = this.form.value;
    console.log(this.nspotFeeObj.nspotFee + this.nspotFeeObj.bankCharge + this.nspotFeeObj.nspotTax);
    let totalamount = this.nspotFeeObj.nspotFee + this.nspotFeeObj.nspotTax;
    let spotaddmionchangres = this.form.value.spotfee;
    console.log(spotaddmionchangres);
  

    if(this.form.value.hasGst === true)
    {
      console.log("is gst true");
      let spotcharge =   3.5/100 * this.form.value.otherFee
      console.log("spot charge",spotcharge.toFixed());
      console.log("spot spotaddmionchangres",spotaddmionchangres);
      
    
      
      if (spotaddmionchangres <= spotcharge ) {
          // 1000>=3500
        this.toastr.error("Spot addmission fee should be greater than  "+ spotcharge.toFixed())

      }
      else {
  
        console.log(formData);
  
        
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
    else{
      console.log("is gst false");
      let spotcharge =   3/100 * this.form.value.otherFee
      if (spotaddmionchangres <= spotcharge ) {
     
        this.toastr.error("Spot addmission fee should be greater than  "+ spotcharge)
      }
      else {
  
        console.log(formData);
  
  
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
  }


    



  }
  get f() { return this.form.controls; }
  gettax(s) {
    return s * 18 / 100;
  }
  gettaxnri(s) {
    return s * 18 / 100;

  }
  getbankdetails(event) {
    console.log(event.target.value);

    this.apiService.doGetRequest("institute/bank-details/byId/" + event.target.value).subscribe(
      data => {
        // this.form.reset();
        let response = data['data'][0]
        console.log(response);
        if (response.isFilingGst === null) {
          response.isFilingGst = false;
        }
        console.log(response);
        this.hasgstvalue =response.isFilingGst;
        this.form.controls['hasGst'].setValue(response.isFilingGst)
      },
      error => {
        console.log(error);

      }
    )
  }
}
