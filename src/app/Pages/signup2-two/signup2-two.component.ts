import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ReCaptchaV3Service } from 'ngx-captcha';


@Component({
  selector: 'app-signup2-two',
  templateUrl: './signup2-two.component.html',
  styleUrls: ['./signup2-two.component.css'],
})
export class Signup2TwoComponent implements OnInit {
  siteKey;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) { }

  form: FormGroup;
  touched = false;
  instituteTypes;
  licenseIssueAuthorities;
  ngOnInit(): void {

    this.apiService.doGetRequest(endPoints.instituteTypes).subscribe(returnData => {
      this.instituteTypes = returnData;
    });

    this.apiService.doGetRequest(endPoints.Get_licenseAuthorities).subscribe((returnData: any) => {
      this.licenseIssueAuthorities = returnData.data;
    });
    // this.reCaptchaV3Service.execute(
    //   this.siteKey, 'signup/step-2', (token:any) => {
    //     console.log('This is your token: ', token);
    //   },{
    //     useGlobalDomain: false
    // });
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
  handleSuccess(e) {
    console.log("ReCaptcha", e);
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
   
    delete this.form.value['recaptcha']
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.CreateInstitute, formData).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Form submission successfull');
        console.log(returnData)
        // this.router.navigate([`/signup/step-3/${returnData.data.id}`]);
        this.router.navigate([`/signup/step-3/${returnData.data.userId}`]);

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
