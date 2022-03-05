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
// import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-detailed-application',
  templateUrl: './detailed-application.component.html',
  styleUrls: ['./detailed-application.component.css']
})
export class DetailedApplicationComponent implements OnInit {
  instituteId = this.authService.instituteProfile.id;
  mainInstitueId = this.authService.instituteProfile.userId;
  applicationstatus;
  appttitudetestdetails: any = [];
  applicationId;
  applicationData;
  personalInfo = new Array();
  permanentAddress = new Array();
  communicationAddress = new Array();
  education = new Array();
  entrance = new Array();
  certificates = new Array();
  instituteInfo;
  personalInfoKeys = {}
  personalinfomationDetaiedmasked: any = [];
  permanentaddressinfomationDetaiedmasked: any = [];
  universityList = [];
  permanentAddressKeys = {}
  communicationAddressKeys = {}
  educationKeys = new Array()
  entranceKeys = new Array()
  certificatesKeys = {}
  baseApiUrl = environment.baseApiUrl;
  studentDetailedlist: any = [];
  reportingForm: FormGroup
  aptitudeForm: FormGroup
  interviewForm: FormGroup
  reviewForm: FormGroup
  onlineinterview: FormGroup
  touched = false;
  applciaitonstatus;
  studentsignatureFile;
  mothersSignatureFile;
  fathersSignatureFile;
  guardiansSignatureFile;
  instCoursedata: any = [];
  otherboardList: any = [];
  boardList: any = [];
  university: any;
  passportsizePic;
  baseurl = environment.baseApiUrl
  imgurl;
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
    this.applciaitonstatus = sessionStorage.getItem("status");
    console.log(this.applciaitonstatus);

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
    this.onlineinterview = this.formBuilder.group({
      id: this.applicationId,
      onlineinterviewstatus: [''],

    });
    this.reviewForm = this.formBuilder.group({
      id: this.applicationId,
      remarks: [''],
    });
    this.getallapptituteTest();
    this.getalluniveristy();
  }
  getcurrentyear() {
    let currentYear;
    return currentYear = new Date().getFullYear();

  }
  imgErrror(event) {
    event.target.src = "assets/images/kyc.png"
  } loadData() {
    // instite details

    this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.mainInstitueId).subscribe((returnData: any) => {
      console.log(returnData)
      this.instituteInfo = returnData.data;
      console.log(this.instituteInfo);

    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
    // files application
    this.apiService.doGetRequest("applicationForm/applications/files/" + this.applicationId).subscribe(
      data => {
        console.log(data);
        this.guardiansSignatureFile = data['data']['guardiansSignatureFile']
        this.fathersSignatureFile = data['data']['fathersSignatureFile']
        this.mothersSignatureFile = data['data']['mothersSignatureFile']
        this.studentsignatureFile = data['data']['signatureFile']
        this.passportsizePic = data['data']['passportSizePhotoFile']
        this.imgurl = this.baseApiUrl + this.passportsizePic
      },
      error => {

      }
    )
    // getting pre-applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[id]=" + this.applicationId
    ).subscribe((returnData: any) => {
      this.instCoursedata = returnData.data[0];
      this.applicationData = returnData.data[0].item;
      this.studentDetailedlist = returnData['data'][0]['student'];

      this.applicationstatus = this.applicationData['applicationStatus'];
      console.log(this.applicationstatus);

      this.reviewForm.controls.remarks.setValue(this.applicationData.remarks)

      const formData = JSON.parse(this.applicationData.formFieldValues)
      let personalInfo = formData.personalInfo
      console.log("Personal Info", personalInfo);
      // // personalInfo.map(x => x.mothersPhoneNumber = "masked data"
      // )

      if (this.applciaitonstatus === "pre-application-applied") {
        this.personalinfomationDetaiedmasked.push(personalInfo);
        this.personalinfomationDetaiedmasked.map(x => x.mothersPhoneNumber = "+91*********************************02")
        this.personalinfomationDetaiedmasked.map(x => x.fathersPhoneNumber = "+91*********************************09")
        this.personalinfomationDetaiedmasked.map(x => x.fathersEmail = "****************************************@gmail.com")
        this.personalinfomationDetaiedmasked.map(x => x.gaurdiansEmail = "****************************************@gmail.com")
        this.personalinfomationDetaiedmasked.map(x => x.gaurdiansPhoneNumber = "+91*********************************19")
        this.personalinfomationDetaiedmasked.map(x => x.mothersEmail = "****************************************@gmail.com")
        // this.personalinfomationDetaiedmasked.map(x =>  x.fathersEmail = "****************************************")
        console.log("Personal masked = ", this.personalinfomationDetaiedmasked);
        personalInfo = this.personalinfomationDetaiedmasked[0]
        console.log(this.personalInfo)
      }


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

      if (this.applciaitonstatus === "pre-application-applied") {
        // this.permanentaddressinfomationDetaiedmasked.push(formData.permanentAddress)
        // console.log("peremnt address = ",formData.permanentAddress);
        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine1 = "****************************************")
        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine2 = "****************************************")

        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine3 = "****************************************")
        // this.personalinfomationDetaiedmasked.map(x => x.permanentTelephone = "****************************************")
        formData.permanentAddress['permanentAddressLine1'] = "****************************************";
        formData.permanentAddress['permanentAddressLine2'] = "****************************************";
        formData.permanentAddress['permanentAddressLine3'] = "****************************************";
        formData.permanentAddress['permanentMobile'] = "****************************************";
        formData.permanentAddress['permanentTelephone'] = "****************************************";

      }

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

      if (this.applciaitonstatus === "pre-application-applied") {
        // this.permanentaddressinfomationDetaiedmasked.push(formData.permanentAddress)
        // console.log("peremnt address = ",formData.permanentAddress);
        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine1 = "****************************************")
        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine2 = "****************************************")

        // this.personalinfomationDetaiedmasked.map(x => x.permanentAddressLine3 = "****************************************")
        // this.personalinfomationDetaiedmasked.map(x => x.permanentTelephone = "****************************************")
        formData.communicationAddress['permanentAddressLine1'] = "****************************************";
        formData.communicationAddress['permanentAddressLine2'] = "****************************************";
        formData.communicationAddress['permanentAddressLine3'] = "****************************************";
        formData.communicationAddress['permanentMobile'] = "****************************************";
        formData.communicationAddress['permanentTelephone'] = "****************************************";

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
        console.log(this.educationKeys);
        
        for (let property in formData.education[j]) {
          if (property == 'additionalFields') {
            for (let item in formData.education[j][property]) {
              educationFields.push(formData.education[j][property][item])
              if (this.educationKeys[j])
              {
              
              
            
                if(this.educationKeys[j][0][0] ==="accademicLevelId" )
                {
                  this.educationKeys[j][0][0] = "testkey"
                }
                this.educationKeys[j][i] = item
                console.log(this.educationKeys[j]);
              }
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
              {this.educationKeys[j][i] = property
              console.log( this.educationKeys[j][i]);}
              
            else {
              let im = { "0": property }
              console.log(im);
              console.log(property);

              if(property ==="accademicLevelId" )
              {
                let im = { "0": "AcademicLevelId" }
                this.educationKeys.push(im)
              
              }
              else
              {
                this.educationKeys.push(im)

              }
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
    const input = document.getElementById('pdfTable');
    var HTML_Width = input.getBoundingClientRect().width;
    var HTML_Height = input.getBoundingClientRect().height;
    var top_left_margin = 15;
    var PDF_Width: any = HTML_Width + (top_left_margin * 2);
    var PDF_Height: any = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    // html2canvas
    // var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


    // html2canvas(document.getElementById('pdfTable')).then(function(canvas) {
    // 	canvas.getContext('2d');

    // 	console.log(canvas.height+"  "+canvas.width);


    // 	var imgData = canvas.toDataURL("image/jpeg", 1.0);
    // 	var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
    //     pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


    // 	for (var i = 1; i <= totalPDFPages; i++) { 
    // 		pdf.addPage(PDF_Width, PDF_Height);
    // 		pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
    // 	}

    //     pdf.save("HTML-Document.pdf");
    //     });
    const doc = new jsPDF('p', 'pt', [200, 650]);
    const pdfTable = this.pdfTable.nativeElement;




    doc.html(pdfTable, {
      callback: function (doc) {
        doc.save('ApplicationForm.pdf');
      },
      margin: [60, 60, 60, 60],
      html2canvas: { scale: .14 }

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
  getallapptituteTest() {
    this.apiService.doGetRequest(`institute/aptitude-tests/` + this.instituteId).subscribe(
      data => {
        this.appttitudetestdetails = data['data'];
      }
    )
  }
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
  doc() {
    sessionStorage.setItem("applicationID", this.applicationId)
    this.router.navigate(['/institute/download-documents'])
  }
  // getcourseDetailsbyId()
  // {
  //   https://nspot-qa.herokuapp.com/api/institute/course/1

  // }
  getalluniveristy() {
    this.apiService.doGetRequest(`university`).subscribe((returnData: any) => {
      this.universityList = returnData.data;
      console.log(this.universityList);
    });

    this.apiService.doGetRequest(`boardType/`).subscribe((returnData: any) => {
      this.boardList = returnData.data;
      console.log(this.boardList);
    });


    this.apiService.doGetRequest(`otherBoardType/`).subscribe((returnData: any) => {
      this.otherboardList = returnData.data;
      console.log(this.otherboardList);
    });

  }
  getname(course) {
    // return this.institutetype.filter(el => el.id === s)
    // console.log(course?.universityTypeId);

    if (course?.universityTypeId === 1) {
      this.universityList.filter(el => {
        if (el.id === course.universityId) {

          this.university = el.university
          return this.university
        }
      }
      )
      // el.id === course.universityId
    }
    if (course?.universityTypeId === 2) {
      this.boardList.filter(el => {
        if (el.id === course.boardId) {

          this.university = el.title
          return this.university
        }
      }
      )
    }
    if (course?.universityTypeId === 3) {
      this.otherboardList.filter(el => {
        if (el.id === course.otherId) {

          this.university = el.title
          return this.university
        }
      }
      )
    }
  }
  getcourseDuration(s) {
    return s?.year + "-" + s?.month + "-" + s?.day + "-" + s?.hour + " Hours"
  }
  getacademic(data)
  {
    console.log(data[0][0])
    return data[0][0]
  }
}
