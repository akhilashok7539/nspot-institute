import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  instituteId;
  institutecourseList :any=[];
  mainDesk:any=[];
  constructor(private instituteService:ApiService) { }

  ngOnInit(): void {
    // this.getallcourserbyInstitute();
    this.institutecourseList = JSON.parse(sessionStorage.getItem("instituteid"))
  }
  // getallcourserbyInstitute()
  // {
  //   this.instituteId = JSON.parse(sessionStorage.getItem("instituteid"))
  //   this.instituteService.doGetRequest(`institute/courses/`+this.instituteId).subscribe(
  //     data =>{
  //       this.institutecourseList = data['data']
  //     },
  //     error =>{

  //     }
  //   )
  // }
  getmaincategory() {

    this.institutecourseList.getallmaincategory().subscribe(
      data => {
        this.mainDesk = data['data'];
      },
      error => {

      }
    )
  }
}
