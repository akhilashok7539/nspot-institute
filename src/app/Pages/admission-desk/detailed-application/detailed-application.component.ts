import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trim } from 'lodash';

@Component({
  selector: 'app-detailed-application',
  templateUrl: './detailed-application.component.html',
  styleUrls: ['./detailed-application.component.css']
})
export class DetailedApplicationComponent implements OnInit {
  instituteId = this.authService.userProfile.userType;
  appttitudetestdetails:any=[];
  applicationId;
  applicationData;
  personalInfo = new Array();
  permanentAddress = new Array();
  communicationAddress = new Array();
  education = new Array();
  entrance = new Array();
  certificates = new Array();

  personalInfoKeys = {}
  permanentAddressKeys = {}
  communicationAddressKeys = {}
  educationKeys = new Array()
  entranceKeys = new Array()
  certificatesKeys = {}
  baseApiUrl = environment.baseApiUrl;

  reportingForm: FormGroup
  aptitudeForm: FormGroup
  interviewForm: FormGroup
  reviewForm: FormGroup
  touched = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.applicationId = _.parseInt(this.route.snapshot.paramMap.get('applicationId'));
    this.loadData()

    this.reportingForm = this.formBuilder.group({
      id: this.applicationId,
      dateOfReporting: ['']
    });

    this.aptitudeForm = this.formBuilder.group({
      id: this.applicationId,
      startDateTimeOfAptitudeTest: [''],
      endDateTimeOfAptitudeTest: [''],
      aptitudeTestId: ['']
    });

    this.interviewForm = this.formBuilder.group({
      id: this.applicationId,
      dateOfInterview: [''],
      interviewLink: [''],
    });

    this.reviewForm = this.formBuilder.group({
      id: this.applicationId,
      remarks: [''],
    });
    this.getallapptituteTest();
  }

  loadData() {
    // getting pre-applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[id]=" + this.applicationId
    ).subscribe((returnData: any) => {
      this.applicationData = returnData.data[0];
      this.reviewForm.controls.remarks.setValue(this.applicationData.remarks + '\n' + trim(new Date().toString()) + ' : ')

      const formData = JSON.parse(this.applicationData.formFieldValues)
      const personalInfo = formData.personalInfo
      let i = 0;
      for (let property in personalInfo) {
        if (property == 'additionalFields') {
          for (let item in personalInfo[property]) {
            this.personalInfo.push(personalInfo[property][item])
            this.personalInfoKeys[i] = item
            i++;
          }
        } else {
          this.personalInfo.push(personalInfo[property])
          this.personalInfoKeys[i] = property
          i++;
        }
      }
      // console.log(this.personalInfo)

      // setting permanent address
      i = 0;
      for (let property in formData.permanentAddress) {
        if (property == 'additionalFields') {
          for (let item in formData.permanentAddress[property]) {
            this.permanentAddress.push(formData.permanentAddress[property][item])
            this.permanentAddressKeys[i] = item
            i++;
          }
        } else {
          this.permanentAddress.push(formData.permanentAddress[property])
          this.permanentAddressKeys[i] = property
          i++;
        }
      }

      // setting communication address
      i = 0;
      for (let property in formData.communicationAddress) {
        if (property == 'additionalFields') {
          for (let item in formData.communicationAddress[property]) {
            this.communicationAddress.push(formData.communicationAddress[property][item])
            this.communicationAddressKeys[i] = item
            i++;
          }
        } else {
          this.communicationAddress.push(formData.communicationAddress[property])
          this.communicationAddressKeys[i] = property
          i++;
        }
      }

      /**
       * Setting educations
       */

      // iterating through educations
      for (let j = 0; j < formData.education.length; j++) {
        i = 0;
        let educationFields = new Array();
        // iterating through each item in an education
        for (let property in formData.education[j]) {
          if (property == 'additionalFields') {
            for (let item in formData.education[j][property]) {
              educationFields.push(formData.education[j][property][item])
              if (this.educationKeys[j])
                this.educationKeys[j][i] = item
              else {
                let im = { "0": item }
                this.educationKeys.push(im)
              }

              i++;
            }
          } else {
            educationFields.push(formData.education[j][property])
            // console.log(j, i, property, formData.education[j][property])
            if (this.educationKeys[j])
              this.educationKeys[j][i] = property
            else {
              let im = { "0": property }
              this.educationKeys.push(im)
            }
            i++;
          }
        }
        this.education.push(educationFields)
      }

      // -------------------------------------------------
      /**
       * Setting entrance exams
       */

      // iterating through entrance exams
      for (let j = 0; j < formData.entrance.length; j++) {
        i = 0;
        let entranceFields = new Array();
        // iterating through each item in an entrance
        for (let property in formData.entrance[j]) {
          if (property == 'additionalFields') {
            for (let item in formData.entrance[j][property]) {
              entranceFields.push(formData.entrance[j][property][item])
              // console.log(j, i, property, formData.entrance[j][property])
              if (this.entranceKeys[j])
                this.entranceKeys[j][i] = item
              else {
                let im = { "0": item }
                this.entranceKeys.push(im)
              }

              i++;
            }
          } else {
            entranceFields.push(formData.entrance[j][property])
            // console.log(j, i, property, formData.entrance[j][property])
            if (this.entranceKeys[j])
              this.entranceKeys[j][i] = property
            else {
              let im = { "0": property }
              this.entranceKeys.push(im)
            }
            i++;
          }
        }
        this.entrance.push(entranceFields)
      }


      // setting certificates
      i = 0;
      for (let property in formData.certificates) {
        if (property == 'additionalFields') {
          for (let item in formData.certificates[property]) {
            this.certificates.push(formData.certificates[property][item])
            this.certificatesKeys[i] = item
            i++;
          }
        } else {
          this.certificates.push(formData.certificates[property])
          this.certificatesKeys[i] = property
          i++;
        }
      }
    });
  }

  /**
 * Confirming before accepting the user application
 * @param id 
 */
  confirmAcceptance(id) {
    Swal.fire({
      title: 'Are you sure?',
      customClass: { content: 'font-23' },
      text: `Upon accepting the application, 
    user will be able to pay the first installment of the fee and 
    the seat for the student will consider as booked and automated email of admission letter will send to the student. 
    Please read Nspot terms and conditions before accepting application.`,
      showCancelButton: true,
      confirmButtonText: `Accept Application`,
      icon: 'warning',
      footer: '<a href>Terms and conditions</a>'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // console.log(result)
        this.acceptApplication(id);
      }
    })
  }

  /**
   * Confirming the resubmission request
   * @param id 
   */
  confirmResubmission(id) {
    Swal.fire({
      title: 'Please state a reason for resubmission',
      input: 'textarea',
      inputValidator: (result) => {
        return !result && 'Please provide a reason'
      },
      showCancelButton: true,
      confirmButtonText: `Reject`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // console.log(result)
        this.resubmitApplication(id, result.value);

      }
    })
  }

  /**
   * Confirming before rejecting the user application
   * @param id 
   */
  confirmReject(id) {
    Swal.fire({
      title: 'Please state a reason to reject',
      input: 'textarea',
      inputValidator: (result) => {
        return !result && 'Please provide a reason'
      },
      showCancelButton: true,
      confirmButtonText: `Reject`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // console.log(result)
        this.rejectApplication(id, result.value);

      }
    })
  }

  /**
   * accept application
   * @param id 
   * @param reason 
   */
  acceptApplication(id) {
    const updateObj = {
      id: id,
      applicationStatus: 'pre-application-approved',
    }
    this.apiService.doPostRequest(endPoints.Update_applicationForm, updateObj
    ).subscribe((returnData: any) => {
      this.toastr.success("Application accepted")
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
    });
  }

  /**
   * Resubmit application with a reason
   * @param id 
   * @param reason 
   */
  resubmitApplication(id, reason) {
    const updateObj = {
      id: id,
      applicationStatus: 'pre-application-returned',
      reason: reason
    }
    this.apiService.doPostRequest(endPoints.Update_applicationForm, updateObj
    ).subscribe((returnData: any) => {
      this.toastr.info("Requested for resubmission")
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
    });

  }

  /**
   * Reject the user application with a reason
   * @param id 
   * @param reason 
   */
  rejectApplication(id, reason) {
    const updateObj = {
      id: id,
      applicationStatus: 'rejected',
      reason: reason
    }
    this.apiService.doPostRequest(endPoints.Update_applicationForm, updateObj
    ).subscribe((returnData: any) => {
      this.toastr.success("Application rejected")
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
    });

  }
  // download pdf
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    doc.html(pdfTable, {
      callback: function (doc) {
        doc.save('tableToPdf.pdf');
      },
      margin: [15, 15, 15, 20],
      html2canvas: { scale: .17 },
    });

  }

  onSubmit(form): void {
    this.touched = true;
    if (form.invalid) {
      return;
    }
    const formData = form.value;

    this.apiService.doPostRequest(endPoints.Update_applicationForm, formData)
      .subscribe((returnData: any) => {
        this.toastr.success('Updated successfully');
        form.reset();
        // this.loadData()
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.error(message);
        });


  }
  getallapptituteTest()
  {
    this.apiService.doGetRequest(`institute/aptitude-tests/`+this.instituteId).subscribe(
      data =>{
        this.appttitudetestdetails = data['data'];
      }
    )
  }
}
