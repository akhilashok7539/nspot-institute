import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
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
  instituteId = this.authService.instituteProfile.id;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  changeCourse(event) {
    this.currentCourseId = event.target.value;
    this.loadDataForCourse(this.currentCourseId)
  }

  loadDataForCourse(courseId) {
    // getting pre-applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[courseId]=" + courseId + "&&where[applicationStatus]=pre-application-applied"
    ).subscribe((returnData: any) => {
      this.preApplications = returnData.data;
      this.preApplications.map(element => {
        element.formFieldValues = JSON.parse(element.formFieldValues)
      })
      console.log(this.preApplications)
    });

    // getting payment awaiting applications
    this.apiService.doGetRequest(
      endPoints.Get_applications + "?where[courseId]=" + courseId + "&&where[applicationStatus]=pre-application-approved"
    ).subscribe((returnData: any) => {
      this.paymentAwaitingApplications = returnData.data;
      this.paymentAwaitingApplications.map(element => {
        element.formFieldValues = JSON.parse(element.formFieldValues)
      })
      console.log(this.paymentAwaitingApplications);

    });
  }
  showPhase(index)
  {
    this.activeButton = index;
  }
  loadData(): void {
    // this.apiService.doGetRequest(endPoints.Get_courses
    //   + "?filter[where][instituteId]=" + this.instituteId
    //   + "&filter[include]=AccademicLevel_Course&filter[include]=CourseStream&filter[include]=CourseStream_Specialization"
    // ).subscribe((returnData: any) => {
    //   console.log("couress", returnData.data)
    //   this.courses = returnData.data;
    // });
    this.apiService.doGetRequest(`institute/courses/`+this.instituteId).subscribe(
      data =>{
        this.courses = data['data']
      },
      error =>{

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
      text: `Upon accepting the application, 
      user will be able to pay the first installment of the fee and 
      the seat for the student will consider as booked. 
      Please read Nspot terms and conditions before accepting application.`,
      showCancelButton: true,
      confirmButtonText: `Accept Application`,
      icon: 'warning',
      footer: '<a href="https://dan.com/buy-domain/nspot.com?redirected=true&tld=com" target="_blank">Terms and conditions</a>'
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
  viewApplicationStatus(item)
  {
    sessionStorage.setItem("status",item.applicationStatus);
    this.router.navigate(['/institute/admission-desk/detailed-application-view/'+item.id])
  }
}
