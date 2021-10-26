import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-completed-studnet-list',
  templateUrl: './completed-studnet-list.component.html',
  styleUrls: ['./completed-studnet-list.component.css']
})
export class CompletedStudnetListComponent implements OnInit {
  instituteId ;
  courses:any=[];
  currentCourseId;
  feeremmitedSApplicants:any=[];
  admisionnumber;
  constructor(private apiService:ApiService,private authService:AuthService,
    private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.instituteId= this.authService.instituteProfile.id;
    this.apiService.doGetRequest(`institute/courses/`+this.instituteId).subscribe(
      data =>{
        this.courses = data['data']
      },
      error =>{

      }
    )
  }
  changeCourse(event) {
    this.currentCourseId = event.target.value;
    this.loadDataForCourse(this.currentCourseId)
  }
  loadDataForCourse(currentCourseId)
  {
    this.apiService.doGetRequest('payment/courseFee/institute/'+currentCourseId).subscribe(
      data =>{
        console.log(data);
        
        let arr = [];
        arr = data['result']
        // console.log("Fee paid students list",arr);
        for(let i=0;i<=arr.length;i++)
        {
          if(arr[i]?.item?.status === "paid")
          {
            this.feeremmitedSApplicants.push(arr[i])
          }
        }
        console.log("Fee paied students",this.feeremmitedSApplicants);
        
      },
      error =>{

      }
    )

  }
  getname(s)
  {
    // console.log(JSON.parse(s.item.ApplicationForm_submission.formFieldValues));
    let personalinfo = JSON.parse(s.item.ApplicationForm_submission.formFieldValues);
    // console.log(personalinfo.personalInfo.fullName);
    return personalinfo.personalInfo.fullName
  }
  viewapplication(s)
  {
    console.log(s);
    
    this.router.navigate(['/institute/admission-desk/detailed-application-view/'+s])

  }
  update()
  {
    let req ={
      admissionId:this.admisionnumber
    }
    console.log(req);
    
  }
}
