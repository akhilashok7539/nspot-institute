import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-update-course-fee-info',
  templateUrl: './update-course-fee-info.component.html',
  styleUrls: ['./update-course-fee-info.component.css']
})
export class UpdateCourseFeeInfoComponent implements OnInit {
  applicationId;
  feesId;
  hasAptitudeTest = false;
  courseDuration;
  instituteDetails:any=[];
  instituteId: number;
  courseId: number;
  form: FormGroup;
  touched = false;
  courserListDetails: any = [];
  paymentTenures;
  bankDetails;
  hasgstvalue = false;
  totalFee: number;
  nspotFeeObj = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
  nspotFeeObjNri = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
  tdscalculation ;
  tdscalculationnri;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.instituteDetails = JSON.parse(sessionStorage.getItem("instituteid"))

    this.route.paramMap.subscribe(res => {
      console.log(res['params']);
      // this.getCourseDetailsByiD(res['params'].id);
      this.applicationId = res['params'].applicationId;
      this.feesId = res['params'].feeid;
    })
    this.instituteId = this.authService.instituteProfile.id;
    this.form = this.formBuilder.group({
      // instituteCourseId: [this.courseId, ],
      paymentTenureId: ['',],
      otherIncludes: ['',],
      otherFee: [0,],
      otherexcludes: ['',],
      bankAccountId: ['',],
      hasScolarship: [false],
      hasScolarshipNri: [false],
      amount: [''],
      spotfee: ['',],
      amountcreditedInstitute: [''],
      refundPolicy: [''],
      // nriOtherexcludes: ['',],
      nriotherFee: [''],
      nrischlorshipamount: [''],
      nriSpotfee: [''],
      nriAmountCreditedinstitute: [''],
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
      hasGst:[''],
      instituteCourseId:['']
    });
    this.calculateTotalFee();
    this.loadData();
    this.form.controls['instituteCourseId'].setValue(this.applicationId)
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

    this.apiService.doGetRequest(`institute/course/fees/` + this.applicationId).subscribe(
      data => {
        this.setForData(data);
      },
      error => {

      })

  }
  setForData(data) {
    this.courserListDetails = data['data'];
    console.log(this.courserListDetails);
    if(this.courserListDetails != null)
    {
      this.courseDuration = this.courserListDetails.Institute_Course['courseDuration']
      this.courseDuration = JSON.parse(sessionStorage.getItem("courseDuration"))
  
  
      this.form.controls['otherFee'].setValue(this.courserListDetails['otherFee']);
      this.setNspotCalculations(this.courserListDetails['otherFee']);
      this.form.controls['nriotherFee'].setValue(this.courserListDetails['nriotherFee']);
      this.setNspotCalculationNri(this.courserListDetails['nriotherFee']);
  
      this.form.controls['otherIncludes'].setValue(this.courserListDetails['otherIncludes']);
      this.form.controls['nriOtherIncludes'].setValue(this.courserListDetails['nriOtherIncludes']);
  
      this.form.controls['otherexcludes'].setValue(this.courserListDetails['otherexcludes']);
      this.form.controls['feeexcludesNri'].setValue(this.courserListDetails['feeexcludesNri']);
  
      this.form.controls['paymentTenureId'].setValue(this.courserListDetails['paymentTenureId']);
      this.form.controls['nripaymentTenureId'].setValue(this.courserListDetails['nripaymentTenureId']);
  
      this.form.controls['hasScolarship'].setValue(this.courserListDetails['hasScolarship']);
      this.form.controls['hasScolarshipNri'].setValue(this.courserListDetails['hasScolarshipNri']);
  
      this.form.controls['amount'].setValue(this.courserListDetails['amount']);
      this.form.controls['nrischlorshipamount'].setValue(this.courserListDetails['nrischlorshipamount']);
  
      this.form.controls['spotfee'].setValue(this.courserListDetails['spotfee']);
      this.form.controls['nriSpotfee'].setValue(this.courserListDetails['nriSpotfee']);
  
      this.form.controls['amountcreditedInstitute'].setValue(this.courserListDetails['amountcreditedInstitute']);
      this.form.controls['nriAmountCreditedinstitute'].setValue(this.courserListDetails['nriAmountCreditedinstitute']);
  
      this.form.controls['refundPolicy'].setValue(this.courserListDetails['refundPolicy']);
      this.form.controls['nrirefundPolicy'].setValue(this.courserListDetails['nrirefundPolicy']);
  
  
  
      this.form.controls['bankAccountId'].setValue(this.courserListDetails['bankAccountId']);
  
      this.form.controls['nspotTax'].setValue(this.courserListDetails['nspotTax']);
      this.form.controls['nspotServiceCharge'].setValue(this.courserListDetails['nspotServiceCharge']);
      this.form.controls['nspotBankCharge'].setValue(this.courserListDetails['nspotBankCharge']);
  
      this.form.controls['nspotTaxNri'].setValue(this.courserListDetails['nspotTaxNri']);
      this.form.controls['nspotServiceChargeNri'].setValue(this.courserListDetails['nspotServiceChargeNri']);
      this.form.controls['nspotBankChargenNri'].setValue(this.courserListDetails['nspotBankChargenNri']);
    }
    else{
      this.courseDuration = JSON.parse(sessionStorage.getItem("courseDuration"))

    }

    
    this.apiService.doGetRequest("institute/bank-details/byId/"+this.courserListDetails['bankAccountId']).subscribe(
      data =>{
  
          let response = data['data'][0]
          console.log(response);
          if(response.isFilingGst === null)
          {
            response.isFilingGst = false;
          }
          console.log(response);
          this.form.controls['hasGst'].setValue(response.isFilingGst)
      },
      error =>{
        console.log(error);

      }
    )

    this.tdscalculationnri = 1/100 * this.form.value.nriSpotfee;
    console.log("tds",this.tdscalculationnri);
    this.tdscalculation = 1/100 * this.form.value.spotfee;
    console.log("tds",this.tdscalculation);
    // let req ={
    //   bankCharge: this.courserListDetails['nspotBankCharge'] ,
    //   nspotFee: this.courserListDetails['nspotServiceCharge'],
    //   nspotTax: 60.98,
    // }
    // this.nspotFeeObj = req;

  }
  // calculating the total fee
  calculateTotalFee(): void {
    const formData = this.form.value;
    const otherFee = _.parseInt(formData.otherFee);
    this.totalFee = otherFee;
  }
  // calculate the nspot fee
  calculateNspotFee(): void {
    this.apiService.doGetRequest(endPoints.Calculate_NspotFee + this.totalFee).subscribe((returnData: any) => {
      // console.log(returnData);
      this.nspotFeeObj = returnData.data;
      console.log(this.nspotFeeObj);

      this.form.controls['nspotTax'].setValue(this.nspotFeeObj.nspotTax);
      this.form.controls['nspotServiceCharge'].setValue(this.nspotFeeObj.nspotFee);
      this.form.controls['nspotBankCharge'].setValue(this.nspotFeeObj.bankCharge);
    });
  }
  setNspotCalculations(data) {
    this.apiService.doGetRequest(endPoints.Calculate_NspotFee + data).subscribe((returnData: any) => {
      // console.log(returnData);
      this.nspotFeeObj = returnData.data;
      console.log(this.nspotFeeObjNri);
      
      this.form.controls['nspotTaxNri'].setValue(this.nspotFeeObjNri.nspotTax);
      this.form.controls['nspotServiceChargeNri'].setValue(this.nspotFeeObjNri.nspotFee);
      this.form.controls['nspotBankChargenNri'].setValue(this.nspotFeeObjNri.bankCharge);

    });
  }
  setNspotCalculationNri(data) {
    this.apiService.doGetRequest(endPoints.Calculate_NspotFee + data).subscribe((returnData: any) => {
      // console.log(returnData);
      this.nspotFeeObjNri = returnData.data;
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
  get f() { return this.form.controls; }

  // submitting the multipart data to the api
  // onSubmit(): void {
  //   console.log(this.form.valid)
  //   console.log(document.getElementsByClassName('ng-invalid'))
  //   this.touched = true;
  //   if (this.form.invalid) {
  //     return;
  //   } else {
  //     // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
  //   }
  //   const formData = this.form.value;
  //   console.log(this.nspotFeeObj.nspotFee + this.nspotFeeObj.bankCharge + this.nspotFeeObj.nspotTax);
  //   let totalamount = this.nspotFeeObj.nspotFee + this.nspotFeeObj.bankCharge + this.nspotFeeObj.nspotTax;
  //   let spotaddmionchangres = this.form.value.spotfee;
  //   console.log(spotaddmionchangres);

  //   if (totalamount > spotaddmionchangres) {
  //     this.toastr.error("Spot Admission fee is less than Nspot fee")
  //   }
  //   else {

  //     if (this.courserListDetails === null) {
  //       this.apiService.doPostRequest(endPoints.Create_courseFee + this.applicationId, this.form.value)
  //         .subscribe((returnData: any) => {
  //           console.log(returnData);
  //           this.toastr.success('Fee updated successfully');
  //           this.router.navigate(['/institute/viewcourse']);
  //         },
  //           error => {
  //             this.toastr.error(error.error[0].message);
  //             console.error(error);
  //           });
  //     }
  //     else {
  //       this.apiService.doPutRequest("institute/course/fees/update/" + this.applicationId, this.form.value)
  //         .subscribe((returnData: any) => {
  //           console.log(returnData);
  //           this.toastr.success('Fee updated successfully');
  //           this.router.navigate(['/institute/viewcourse']);
  //         },
  //           error => {
  //             this.toastr.error(error.error[0].message);
  //             console.error(error);
  //           });
  //     }

  //   }
  // }
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
      this.toastr.error("Spot Admission fee should be greater than  "+ spotcharge.toFixed())

    }
    else {

      console.log(formData);

      
      // this.apiService.doPostRequest(endPoints.Create_courseFee + this.instituteId, formData)
      //   .subscribe((returnData: any) => {
      //     console.log(returnData);
      //     this.toastr.success('Form submission successfull');
      //     this.router.navigate(['/institute/post/course/step-3/' + this.courseId]);
      //   },
      //     error => {
      //       this.toastr.error(error.error[0].message);
      //       console.error(error);
      //     });
      if (this.courserListDetails === null) {
        this.apiService.doPostRequest(endPoints.Create_courseFee + this.applicationId, this.form.value)
          .subscribe((returnData: any) => {
            console.log(returnData);
            this.toastr.success('Fee updated successfully');
            this.router.navigate(['/institute/viewcourse']);
          },
            error => {
              this.toastr.error(error.error[0].message);
              console.error(error);
            });
      }
      else {
        this.apiService.doPutRequest("institute/course/fees/update/" + this.applicationId, this.form.value)
          .subscribe((returnData: any) => {
            console.log(returnData);
            this.toastr.success('Fee updated successfully');
            this.router.navigate(['/institute/viewcourse']);
          },
            error => {
              this.toastr.error(error.error[0].message);
              console.error(error);
            });
      }

    }
  }
  else{
    console.log("is gst false");
    let spotcharge =   3/100 * this.form.value.otherFee
    if (spotaddmionchangres <= spotcharge ) {
   
      this.toastr.error("Spot Admission fee should be greater than  "+ spotcharge)
    }
    else {

      console.log(formData);


      // this.apiService.doPostRequest(endPoints.Create_courseFee + this.instituteId, formData)
      //   .subscribe((returnData: any) => {
      //     console.log(returnData);
      //     this.toastr.success('Form submission successfull');
      //     this.router.navigate(['/institute/post/course/step-3/' + this.courseId]);
      //   },
      //     error => {
      //       this.toastr.error(error.error[0].message);
      //       console.error(error);
      //     });
      if (this.courserListDetails === null) {
        this.apiService.doPostRequest(endPoints.Create_courseFee + this.applicationId, this.form.value)
          .subscribe((returnData: any) => {
            console.log(returnData);
            this.toastr.success('Fee updated successfully');
            this.router.navigate(['/institute/viewcourse']);
          },
            error => {
              this.toastr.error(error.error[0].message);
              console.error(error);
            });
      }
      else {
        this.apiService.doPutRequest("institute/course/fees/update/" + this.applicationId, this.form.value)
          .subscribe((returnData: any) => {
            console.log(returnData);
            this.toastr.success('Fee updated successfully');
            this.router.navigate(['/institute/viewcourse']);
          },
            error => {
              this.toastr.error(error.error[0].message);
              console.error(error);
            });
      }
      
    }
  }
}

}
  getbankdetails(event)
  {
    console.log(event.target.value);

    this.apiService.doGetRequest("institute/bank-details/byId/"+event.target.value).subscribe(
      data =>{
  
          let response = data['data'][0]
          console.log(response);
          if(response.isFilingGst === null)
          {
            response.isFilingGst = false;
          }
          console.log(response);
          this.hasgstvalue =response.isFilingGst;
          this.form.controls['hasGst'].setValue(response.isFilingGst)
      },
      error =>{
        console.log(error);

      }
    )
  }
  gettax(s)
  {
    return s * 18/100;
  }
  gettaxnri(s)
  {
    return s * 18/100;

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
}
