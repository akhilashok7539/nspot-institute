import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-institutekyc-info',
  templateUrl: './edit-institutekyc-info.component.html',
  styleUrls: ['./edit-institutekyc-info.component.css']
})
export class EditInstitutekycInfoComponent implements OnInit {
  instituteid;
  instituteDetails:any=[];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private routerparams:ActivatedRoute
  ) { }

  form: FormGroup;
  touched = false;
  instituteTypes;
  licenseIssueAuthorities;
  ngOnInit(): void {
    this.routerparams.paramMap.subscribe(res=>{
      console.log(res['params'].id);
      this.instituteid = res['params'].id;
    })
    this.apiService.doGetRequest(endPoints.instituteTypes).subscribe(returnData => {
      this.instituteTypes = returnData;
    });

    this.apiService.doGetRequest(endPoints.Get_licenseAuthorities).subscribe((returnData: any) => {
      this.licenseIssueAuthorities = returnData.data;
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      code: [''],
      principalName: ['', [Validators.required]],
      officialMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      licenseIssueAuthorityId: ['', [Validators.required]],
      licenseAuthorityName: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      nameofTown: ['', [Validators.required]],
      licenseIssuedDate: ['', [Validators.required]],
      licenseRenewalDate: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      addressLine3: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      block: ['', [Validators.required]],
      town: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone1: ['', [Validators.minLength(6)]],
      telephone2: ['', [Validators.minLength(6)]],
      mobile1: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      mobile2: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      haveBoysHostel: [false],
      haveGirlsHostel: [false],
      foodAvailableAtHostel: [false],
      hostalAnnualFee: [''],
      transportationInfo: ['', [Validators.required]],
      gmapLatitude: ['', [Validators.required]],
      gmapLongitude: ['', [Validators.required]],
      year_of_establishment:['', [Validators.required]],
      designation:['', [Validators.required]],
      institute_aid_status:['', [Validators.required]],
      ownership:['', [Validators.required]],
      institute_category:['', [Validators.required]],
      admission_office_email:['', [Validators.required]],
      admission_office_mobileno1:['', [Validators.required]],
      admission_office_mobileno2:['', [Validators.required]],
      // recaptcha: ['', Validators.required],
      busAvailablity:[false],
      vanavailablity:[false],
      routeInfo: [''],
      officialEmail: ['', Validators.required],
    });
    this.loadData();
  }
  loadData()
  {
    console.log(this.instituteid);
    
    this.apiService.doGetRequest(`institute/`+this.instituteid).subscribe(
      data =>{
        console.log(data);
        this.instituteDetails = data['data']
        this.form.controls['name'].setValue(this.instituteDetails['name']);
        this.form.controls['year_of_establishment'].setValue(this.instituteDetails['year_of_establishment']);
        this.form.controls['typeId'].setValue(this.instituteDetails['typeId']);
        this.form.controls['institute_category'].setValue(this.instituteDetails['institute_category']);
        this.form.controls['code'].setValue(this.instituteDetails['code']);
        this.form.controls['ownership'].setValue(this.instituteDetails['ownership']);
        this.form.controls['principalName'].setValue(this.instituteDetails['principalName']);
        this.form.controls['designation'].setValue(this.instituteDetails['designation']);
        this.form.controls['officialEmail'].setValue(this.instituteDetails['officialEmail']);
        this.form.controls['officialMobile'].setValue(this.instituteDetails['officialMobile']);
        this.form.controls['licenseIssueAuthorityId'].setValue(this.instituteDetails['LicenceIssueAuthority']);
        this.form.controls['licenseAuthorityName'].setValue(this.instituteDetails['licenseAuthorityName']);
        this.form.controls['licenseNumber'].setValue(this.instituteDetails['licenseNumber']);
        this.form.controls['nameofTown'].setValue(this.instituteDetails['nameofTown']);
        
        this.form.controls['licenseIssuedDate'].setValue(this.instituteDetails['licenseIssuedDate'].split("T")[0]);
        this.form.controls['licenseRenewalDate'].setValue(this.instituteDetails['licenseRenewalDate'].split("T")[0]);
        this.form.controls['institute_aid_status'].setValue(this.instituteDetails['institute_aid_status']);

        this.form.controls['addressLine1'].setValue(this.instituteDetails['addressLine1']);
        this.form.controls['addressLine2'].setValue(this.instituteDetails['addressLine2']);
        this.form.controls['addressLine3'].setValue(this.instituteDetails['addressLine3']);

        
        // this.form.controls['principalName'].setValue(this.instituteDetails['principalName']);
        this.form.controls['officialMobile'].setValue(this.instituteDetails['officialMobile']);
        this.form.controls['country'].setValue(this.instituteDetails['country']);
        this.form.controls['state'].setValue(this.instituteDetails['state']);
        this.form.controls['district'].setValue(this.instituteDetails['district']);
        this.form.controls['town'].setValue(this.instituteDetails['town']);
        this.form.controls['pin'].setValue(this.instituteDetails['pin']);
        // this.form.controls['licenseAuthorityName'].setValue(this.instituteDetails['licenseAuthorityName']);
        // this.form.controls['licenseNumber'].setValue(this.instituteDetails['licenseNumber']);
        
       
        this.form.controls['officialEmail'].setValue(this.instituteDetails['officialEmail']);
     
        this.form.controls['email'].setValue(this.instituteDetails['email']);
        this.form.controls['telephone1'].setValue(this.instituteDetails['telephone1']);
        this.form.controls['telephone2'].setValue(this.instituteDetails['telephone2']);
        this.form.controls['mobile1'].setValue(this.instituteDetails['mobile1']);
        this.form.controls['mobile2'].setValue(this.instituteDetails['mobile2']);
        this.form.controls['haveBoysHostel'].setValue(this.instituteDetails['haveBoysHostel']);
        this.form.controls['haveGirlsHostel'].setValue(this.instituteDetails['haveGirlsHostel']);
        this.form.controls['hostalAnnualFee'].setValue(this.instituteDetails['hostalAnnualFee']);
        this.form.controls['transportationInfo'].setValue(this.instituteDetails['transportationInfo']);
        this.form.controls['gmapLatitude'].setValue(this.instituteDetails['gmapLatitude']);
        this.form.controls['gmapLongitude'].setValue(this.instituteDetails['gmapLongitude']);

        this.form.controls['admission_office_email'].setValue(this.instituteDetails['admission_office_email']);
        this.form.controls['admission_office_mobileno1'].setValue(this.instituteDetails['admission_office_mobileno1']);
        this.form.controls['admission_office_mobileno2'].setValue(this.instituteDetails['admission_office_mobileno2']);

        

      },
      error =>{

      }
    )
  }
  confirmMobileNumberBeforeSMS(mobileNumber) {
    const isValidNumber = this.validateMobile(mobileNumber);
    if (!isValidNumber) {
      Swal.fire({
        text: 'Invalid Mobile number',
        icon: "error"
      })
    }
    else {
      Swal.fire({
        title: 'Confirm Number',
        text: "Is entered mobile number +91 " + mobileNumber + " correct ?",
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {

        // this.enterOTP(mobileNumber);
        // return;
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // console.log(result)
          const body = {
            phoneNumber: "91" + mobileNumber,
          }
          this.apiService.doPostRequest(endPoints.Create_OTP, body).subscribe((data: any) => {
            this.enterOTP(mobileNumber);
          }, error => {
            this.toastr.error("Something went wrong, please try again later")
          })
        }
      })
    }

  }

  enterOTP(phoneNumber) {
    const isValidNumber = this.validateMobile(phoneNumber);
    if (!isValidNumber) {
      Swal.fire({
        text: 'Invalid Mobile number',
        icon: "error"
      })
    }
    else {
      Swal.fire({
        title: 'Enter the OTP',
        input: 'password',
        inputValidator: (result) => {
          return new Promise((resolve) => {
            if (result) {
              if (this.validateOtp(result)) {
                (document.querySelector('#officialMobile') as HTMLInputElement).setAttribute('disabled', '');
                (document.querySelector('#officialMobileVerifyBtn') as HTMLInputElement).setAttribute('disabled', '');
                (document.querySelector('#officialMobileEnterOtp') as HTMLInputElement).setAttribute('disabled', '');

                resolve('');
              } else {
                resolve('Enter a valid otp');
              }
            }
            else {
              resolve("Enter otp")
            }

          });

        },
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCloseButton: false,

        confirmButtonText: `SUBMIT`,
      }).then((result) => {

        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const body = {
            phoneNumber: "91" + phoneNumber,
            otp: result.value
          }
          this.apiService.doPostRequest(endPoints.Validate_OTP, body).subscribe((returnData: any) => {
            console.log(returnData)
            if (returnData.status == true) {
              this.toastr.success("Mobile number verified successfully")
            }
            else {
              this.toastr.error("Mobile number verification failed")
              Swal.showValidationMessage(
                `Request failed: `
              )

            }
          }, error => {
            this.toastr.error("Mobile number validated failed, please try again")
          })
        }
      })
    }
  }


  onSubmit(): void {
    this.touched = true;
    // if (this.form.invalid) {
    //   return;
    // } else {
    //   (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    // }
    const formData = this.form.value;
    this.apiService.doPutRequest(`institute/update/`+this.instituteid, formData).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Form submission successfull');
        console.log(returnData)
        this.router.navigate(["/institute/dashboard"]);
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
  validateMobile(mobileNumber) {
    const regex = /^\d{10}$/;
    if (mobileNumber.match(regex)) {
      return true;
    }
    else {
      return false;
    }
  }

  validateOtp(otp) {
    const regex = /^\d{6}$/;
    if (otp.match(regex)) {
      return true;
    }
    else {
      return false;
    }
  }
  get f() { return this.form.controls; }
}