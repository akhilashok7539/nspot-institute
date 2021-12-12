import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { scorllNotes } from 'src/app/config/constants';
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
  search;
  scrollNotes = scorllNotes;
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
  getselectedDate(event)
  {
  let date= event.target.value;
  console.log(date);
  let courseFeeRemittedreq ={
    "courseId":this.currentCourseId,
     "addedDate":date
  }
  this.apiService.doPostRequest('payment/courseFee/institute/',courseFeeRemittedreq).subscribe(
    data =>{
      console.log(data);
      
      let arr = [];
      arr = data['result']
      // console.log("Fee paid students list",arr);

      if( data['result'].length === 0)
      {
        this.feeremmitedSApplicants = [];
      }
      else{


      for(let i=0;i<=arr.length;i++)
      {
        if(arr[i]?.item?.status === "paid")
        {
          this.feeremmitedSApplicants.push(arr[i])
        }
      }
    }

      console.log("Fee paied students",this.feeremmitedSApplicants);
      
    },
    error =>{
      this.feeremmitedSApplicants = [];
    }
  )
  }
  changeCourse(event) {
    this.feeremmitedSApplicants = [];
    this.currentCourseId = event.target.value;
    this.loadDataForCourse(this.currentCourseId)
  }
  loadDataForCourse(currentCourseId)
  {
    let courseFeeRemittedreq ={
      "courseId":currentCourseId,
     
    }
    this.apiService.doPostRequest('payment/courseFee/institute/',courseFeeRemittedreq).subscribe(
      data =>{
        console.log(data);
        
        let arr = [];
        arr = data['result']
        // console.log("Fee paid students list",arr);
        if( data['result'].length === 0)
        {
          this.feeremmitedSApplicants = [];
        }
        else{
  
  
        for(let i=0;i<=arr.length;i++)
        {
          if(arr[i]?.item?.status === "paid")
          {
            this.feeremmitedSApplicants.push(arr[i])
          }
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
  update(item)
  {
    sessionStorage.setItem("applciationdata",JSON.stringify(item))
   this.router.navigate(['/institute/add-admissionnumber'])
    
  }

  getpaymentTenture(id){
    console.log(id);
    
    return (
      this.feeremmitedSApplicants.find((el) => el.id.toString() === (id || "").toString()) || {
        title: "",
      }
    );
  }
  changeEvent(event){
    console.log(event.target.value);
    this.feeremmitedSApplicants.filter(object =>{
      // object.item.ApplicationForm_submission.nSpotReferenceId
      if(object.item.ApplicationForm_submission.nSpotReferenceId === event.target.value)
      {
        console.log(object);
        this.feeremmitedSApplicants=[];
        this.feeremmitedSApplicants.push(object)
      }
     
    })
    // this.feeremmitedSApplicants.find((el) => 
    
    // el.item.ApplicationForm_submission.nSpotReferenceId.toString() === (event.target.value || "")
    
    // );
  }
  // getpaymentTenture(courseFees.paymentTenureId).title
}
