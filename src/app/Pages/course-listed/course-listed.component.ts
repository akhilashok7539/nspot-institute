import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-course-listed',
  templateUrl: './course-listed.component.html',
  styleUrls: ['./course-listed.component.css'],
})
export class CourseListedComponent implements OnInit {
  academicLevel = 0;
  empty = true;
  instituteLoginDetails;
  instituteId;
  institutecourseList:any=[];
  isactiveChecked = false;
  constructor(private instituteService:ApiService,
    private toaster:ToastrService,
    private router:Router) {}

  ngOnInit(): void 
  {

  
  this.instituteLoginDetails = JSON.parse(sessionStorage.getItem("userLogin"));
  this.instituteId = this.instituteLoginDetails['instituteProfile'].id;
  this.GETINSTITUTESbYCOURSEiD();
}

  changeAcademicLevel() {
    if (this.academicLevel == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  GETINSTITUTESbYCOURSEiD(){
    this.instituteService.doGetRequest(`institute/courses/`+this.instituteId).subscribe(
      data =>{
        this.institutecourseList = data['data']
      },
      error =>{

      }
    )
  }
  // routerLink="/institute/viewcourse"
  view(event)
  {
    console.log(event);
    
    sessionStorage.setItem("instituteid",JSON.stringify(event));
    this.router.navigate(['/institute/viewcourse'])
  }
  checkBoxChanged(event,item)
  {
    console.log(event.target.checked,item.id);
    if(item.isActive == true)
    {
      this.isactiveChecked = false;
    }
    else{
      this.isactiveChecked = true;

    }
    let req = {
      "isActive":this.isactiveChecked
    }
    this.instituteService.doPutRequest(`institute/course/update/active-status/`+item.id,req).subscribe(
      data =>{
        this.toaster.success("Status Updated")
        this.ngOnInit();
      }
     
    )
  }
}
