import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.css']
})
export class InnerHeaderComponent implements OnInit {
  userId = this.authService.instituteProfile.id;
  notifications;
  currentselectedPlans:any=[];
  courseslist:any=[];
  courseCountLengthSubscribe:any=[];
  curentcourseCountLength = "0";
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {
    const that = this;
    setInterval(function () {
      // that.checkForNotification();
    }, 10000)
    this.loaddata();
  }

  loaddata()
  {
    this.apiService.doGetRequest('payment/subscription/institute/'+this.userId).subscribe((returnData: any) => {
      this.currentselectedPlans = returnData['data'][0];
      if(this.currentselectedPlans)
      {
        this.courseCountLengthSubscribe = this.currentselectedPlans['Subscription_Tier'].coursesCount;
        console.log(this.currentselectedPlans);
      }
    
    });
    this.apiService.doGetRequest('institute/courses/'+this.userId).subscribe((returnData: any) =>{
      this.courseslist = returnData['data']
      this.curentcourseCountLength = this.courseslist.length;
    })
  }

  checkForNotification() {
    let orderBy = new Array()
    orderBy = [['createdAt', 'DESCs']]
    this.apiService.doGetRequest(
      endPoints.Get_notifications + "?where[userId]=" + this.userId + "&order[0][0]=createdAt"
    ).subscribe((returnData: any) => {
      this.notifications = returnData.data
      console.log(this.notifications)
    });
  }

  /**
   * changing notification status
   */
  changeStatus(id, status) {
    if (status == "new") {
      const newObj = { id: id, status: "viewed" }
      console.log(newObj)
      this.apiService.doPostRequest(endPoints.Update_notifications, newObj).subscribe(returnData => {
        console.log("update obj", returnData)
      })
    }
  }

  logout(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
  postCourse()
  {
    if(this.curentcourseCountLength < this.courseCountLengthSubscribe)
    {
      this.router.navigate(['/institute/post/course'])

    }
    else{
      this.toaster.warning("Course Count limit Reached! Upgrade your plan")
    }
  }
  admisonOfferlist()
  {
    // routerLink="/institute/admission-officer"
    if(this.curentcourseCountLength < this.courseCountLengthSubscribe)
    {
      this.router.navigate(['/institute/admission-officer'])

    }
    else{
      console.log("logo",this.currentselectedPlans);
      if(this.currentselectedPlans)
      {
        this.toaster.warning("Course Count limit Reached! Upgrade your plan")

      }
      else{
        this.toaster.warning("Please choose any plans")
      }
    }
  }
}
