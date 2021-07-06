import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private instituteService:ApiService,private router:Router) {}

  ngOnInit(): void 
  {

  
  this.instituteLoginDetails = JSON.parse(sessionStorage.getItem("userLogin"));
  this.instituteId = this.instituteLoginDetails['userProfile'].userId;
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
}
