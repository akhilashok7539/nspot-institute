import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { alertNotes, scorllNotes } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admission-desk',
  templateUrl: './admission-desk.component.html',
  styleUrls: ['./admission-desk.component.css']
})
export class AdmissionDeskComponent implements OnInit {
  courses
  currentCourseId
  preApplications
  paymentAwaitingApplications;
  activeButton = 1;
  rejecterdapplciation;
  feeremmitedSApplicants: any = [];
  scrollNotes = scorllNotes;
  currLat:any;
  currLng:any;
  alertNotes = alertNotes;
  coursechangedselected;
  courseIDSelected = "";
  instituteId = this.authService.instituteProfile.id;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
    console.log(this.scrollNotes);
    sessionStorage.removeItem("status")
    if(sessionStorage.getItem("courseIdliveadmisiondesk"))
    {
      console.log("yes");
      this.courseIDSelected = sessionStorage.getItem("courseIdliveadmisiondesk")
      this.loadDataForCourse(sessionStorage.getItem("courseIdliveadmisiondesk"))
    }
    else{
      console.log("no");

    }
  }

  changeCourse(event) {
    this.currentCourseId = event.target.value;
    // if(this.activeButton === 1)
    // {
    //   this.preApplications = [];
    // }
    // if(this.activeButton === 2)
    // {
    //   this.paymentAwaitingApplications = [];
    // }
    // if(this.activeButton === 3)
    // {
    //   this.feeremmitedSApplicants = [];
    // }
    this.loadDataForCourse(this.currentCourseId)
    sessionStorage.setItem("courseIdliveadmisiondesk",this.currentCourseId)

  }

  loadDataForCourse(courseId) {
    this.coursechangedselected = courseId;
    // getting pre-applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[courseId]=" + courseId + "&&where[applicationStatus]=pre-application-applied"
    ).subscribe((returnData: any) => {
      this.preApplications = [];
      this.preApplications = returnData.data;

      this.preApplications.map(element => {
        console.log(element);

        element.formFieldValues = JSON.parse(element.item.formFieldValues)
      })
      console.log(this.preApplications)
    });

    // getting payment awaiting applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[courseId]=" + courseId + "&&where[applicationStatus]=pre-application-approved"
    ).subscribe((returnData: any) => {
      this.paymentAwaitingApplications = [];
      this.paymentAwaitingApplications = returnData.data;
      this.paymentAwaitingApplications.map(element => {
        console.log(element);
        element.formFieldValues = JSON.parse(element.item.formFieldValues)
      })
      console.log(this.paymentAwaitingApplications);

    });


    // get fee paied student list by courseId

    let courseFeeRemittedreq = {
      "courseId": courseId,

    }
    this.apiService.doPostRequest('payment/courseFee/institute/', courseFeeRemittedreq).subscribe(
      data => {
        this.feeremmitedSApplicants = [];
        console.log(data);

        let arr = [];
        arr = data['result']
        // console.log("Fee paid students list",arr);
        for (let i = 0; i <= arr.length; i++) {
          if (arr[i]?.item?.status === "paid") {
            this.feeremmitedSApplicants.push(arr[i])
          }
        }
        console.log("Fee paied students", this.feeremmitedSApplicants);

      },
      error => {

      }
    )

  }
  getName(item) {
    console.log(item.item.formFieldValues.personalInfo.fullName);

  }
  showPhase(index) {
    this.activeButton = index;
    if (this.activeButton === 4) {
      this.getRejectedApplications();
    }
  }
  getRejectedApplications() {
    this.apiService.doGetRequest(`applicationForm/applications/rejected`).subscribe(
      data => {
        console.log(data);
        this.rejecterdapplciation = data['data']
        this.rejecterdapplciation.map(element => {
          element.formFieldValues = JSON.parse(element.formFieldValues)
        })
      },
      error => {

      }
    )
  }
  loadData(): void {
    // this.apiService.doGetRequest(endPoints.Get_courses
    //   + "?filter[where][instituteId]=" + this.instituteId
    //   + "&filter[include]=AccademicLevel_Course&filter[include]=CourseStream&filter[include]=CourseStream_Specialization"
    // ).subscribe((returnData: any) => {
    //   console.log("couress", returnData.data)
    //   this.courses = returnData.data;
    // });
    this.apiService.doGetRequest(`institute/courses/` + this.instituteId).subscribe(
      data => {
        this.courses = data['data']
      },
      error => {

      }
    )
    //     this.apiService.doGetRequest(`/institute/courses/`+ this.instituteId
    //  ).subscribe((returnData: any) => {
    //   console.log("couress", returnData.data)
    //   this.courses = returnData.data;
    // });

  }


  /**
 * Confirming before accepting the user application
 * @param id 
 */
  confirmAcceptance(id) {
    Swal.fire({
      title: 'Are you sure?',
      customClass: { content: 'font-23' },
      text: alertNotes.APPROVE_APPLICATIONS,
      showCancelButton: true,
      confirmButtonText: `Accept Application`,
      icon: 'warning',
      // footer: '<a href="https://dan.com/buy-domain/nspot.com?redirected=true&tld=com" target="_blank">Terms and conditions</a>'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(result)
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
        console.log(result)
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
      text: alertNotes.REJECT_APPLICATIONS,
      inputValidator: (result) => {
        return !result && 'Please provide a reason'
      },
      showCancelButton: true,
      confirmButtonText: `Reject`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(result)
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
      this.loadDataForCourse(this.currentCourseId)
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
      this.loadDataForCourse(this.currentCourseId)
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
      this.loadDataForCourse(this.currentCourseId)
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
      this.loadDataForCourse(this.currentCourseId)
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
      this.loadDataForCourse(this.currentCourseId)
    }, error => {
      console.log(error)
      this.toastr.error("Something went wrong! Please try again later")
      this.loadDataForCourse(this.currentCourseId)
    });

  }
  viewApplicationStatus(item) {
    console.log(item);
    if (item.viewStatus === false) {
      let req = {
        "viewStatus": true
      }
      this.apiService.doPutRequest(`applicationForm/applications/updateView/` + item.id, req).subscribe(
        data => {

        },
        error => {

        }
      )
    }
    sessionStorage.setItem("status", item.applicationStatus);
    this.router.navigate(['/institute/admission-desk/detailed-application-view/' + item.id])
  }
  deleteapplciation(s) {
    this.apiService.dodeleteRequest(`applicationForm/applications/remove/` + s.id).subscribe(
      data => {
        this.toastr.success("Application Deleted")
        this.rejecterdapplciation();
      },
      error => {
        this.toastr.success("Application Unable to Deleted")

      }
    )
  }
  upload(s) {
    this.router.navigate(['/institute/upload-receipt/' + s])
  }
  getname(s) {
    // console.log(JSON.parse(s.item.ApplicationForm_submission.formFieldValues));
    let personalinfo = JSON.parse(s.item.ApplicationForm_submission.formFieldValues);
    // console.log(personalinfo.personalInfo.fullName);
    return personalinfo.personalInfo.fullName
  }
  viewapplication(s) {
    console.log(s);

    this.router.navigate(['/institute/admission-desk/detailed-application-view/' + s])

  }
  viewReciptadmin(s) {
    let apiurl = environment.baseApiUrl
    window.open(apiurl + s, "_blank")
  }

  selectedDate(s)
  {
    console.log(s.target.value);
    let req ={
      "addedDate": s.target.value,
      "courseId": this.coursechangedselected
    }
    this.apiService.doPostRequest('payment/courseFee/institute/', req).subscribe(
      data => {
        this.feeremmitedSApplicants = [];
        console.log(data);

        let arr = [];
        arr = data['result']
        // console.log("Fee paid students list",arr);
        for (let i = 0; i <= arr.length; i++) {
          if (arr[i]?.item?.status === "paid") {
            this.feeremmitedSApplicants.push(arr[i])
          }
        }
        console.log("Fee paied students", this.feeremmitedSApplicants);

      },
      error => {

      }
    )
  }
}



// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     this.currLat = "53.32055555555556";
//     this.currLng = "-1.7297222222222221";
//     console.log(this.currLat);
//     console.log(this.currLng);

//     var R = 6371;
//     var lat2: any = '53.31861111111111';
//     var lon3: any = '-1.6997222222222223';
//     var p = 0.017453292519943295;
//     var c = Math.cos;
//     var a =
//       0.5 -
//       c((lat2 - this.currLat) * p) / 2 +
//       (c(this.currLat * p) *
//         c(lat2 * p) *
//         (1 - c((lon3 - this.currLng) * p))) /
//         2;
//     console.log(12742 * Math.asin(Math.sqrt(a)), 'Km');
//   });
// } else {
//   alert('Geolocation is not supported by this browser.');
// }