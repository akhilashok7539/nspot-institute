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
  instituteId: number;
  courseId: number;
  form: FormGroup;
  touched = false;
  courserListDetails:any=[];
  paymentTenures;
  bankDetails;
  totalFee: number;
  nspotFeeObj = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };
  nspotFeeObjNri = { nspotFee: 0, bankCharge: 0, nspotTax: 0 };

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
    this.route.paramMap.subscribe(res =>{
      console.log(res['params']);
      // this.getCourseDetailsByiD(res['params'].id);
      this.applicationId = res['params'].applicationId;
      this.feesId = res['params'].feeid;
    })
    this.instituteId = this.authService.instituteProfile.id;
    this.form = this.formBuilder.group({
      // instituteCourseId: [this.courseId, ],
      paymentTenureId: ['', ],
      otherIncludes: ['', ],
      otherFee: [0, ],
      otherexcludes: ['', ],
      bankAccountId: ['', ],
      hasScolarship: [false],
      hasScolarshipNri:[false],
      amount: [''],
      spotfee: ['',],
      amountcreditedInstitute: [''],
      refundPolicy: [''],
      // nriOtherexcludes: ['',],
      nriotherFee: [''],
      nrischlorshipamount: [''],
      nriSpotfee:[''],
      nriAmountCreditedinstitute:[''],
      nripaymentTenureId:[''],
      nrirefundPolicy:[''],
      nriOtherIncludes:[''],
      feeexcludesNri:[''],
      nspotTaxNri:[''],
      nspotTax:[''],
      nspotServiceChargeNri:[''],
      nspotServiceCharge:[''],
      nspotBankChargenNri:[''],
      nspotBankCharge:[''],

    });
    this.calculateTotalFee();
    this.loadData();
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

    this.apiService.doGetRequest(`institute/course/fees/`+this.applicationId).subscribe(
      data =>{
        this.setForData(data);
      },
      error=>{

      })

  }
  setForData(data) 
  {
    this.courserListDetails = data['data'];
    console.log(this.courserListDetails);
    this.courseDuration = this.courserListDetails.Institute_Course['courseDuration']
    
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
    setNspotCalculations(data)
    {
      this.apiService.doGetRequest(endPoints.Calculate_NspotFee + data).subscribe((returnData: any) => {
        // console.log(returnData);
        this.nspotFeeObj = returnData.data;
        this.form.controls['nspotTaxNri'].setValue(this.nspotFeeObjNri.nspotTax);
    this.form.controls['nspotServiceChargeNri'].setValue(this.nspotFeeObjNri.nspotFee);
    this.form.controls['nspotBankChargenNri'].setValue(this.nspotFeeObjNri.bankCharge);

      });
    }
    setNspotCalculationNri(data)
    {
      this.apiService.doGetRequest(endPoints.Calculate_NspotFee + data).subscribe((returnData: any) => {
        // console.log(returnData);
        this.nspotFeeObjNri = returnData.data;
      });
    }

    calculateNspotFeeNri(): void
    {
      const formData = this.form.value;
      const otherFee = _.parseInt(formData.nriotherFee);
      let totalfeesnri = otherFee;
      this.apiService.doGetRequest(endPoints.Calculate_NspotFee + totalfeesnri).subscribe((returnData: any) => {
        this.nspotFeeObjNri = returnData.data;
      });
    }
  get f() { return this.form.controls; }
  
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
  this.apiService.doPutRequest("institute/course/fees/update/"+ this.applicationId, this.form.value)
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
