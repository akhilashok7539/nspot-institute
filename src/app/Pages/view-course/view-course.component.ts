import { Component, OnInit } from '@angular/core';
import { endPoints } from 'src/app/config/endPoints';
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
  courseFees:any=[];
  paymentTenures:any=[];
  constructor(private instituteService:ApiService) { }

  ngOnInit(): void {
    // this.getallcourserbyInstitute();
    this.institutecourseList = JSON.parse(sessionStorage.getItem("instituteid"));
 
    this.instituteService.doGetRequest(endPoints.Get_paymentTenures).subscribe((returnData: any) => {
      this.paymentTenures = returnData.data;
      console.log(this.paymentTenures);
    });
    this.getfeeInfo();
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
  getfeeInfo()
  {
    let id = this.institutecourseList['item'].instituteId
    this.instituteService.doGetRequest(`institute/course/fees/`+id).subscribe(
      data =>{
        console.log("feess",data);
        this.courseFees = data['data']
      } 
    )
  }
  getpaymentTenture(id){
    console.log(id);
    
    return (
      this.paymentTenures.find((el) => el.id.toString() === (id || "").toString()) || {
        title: "",
      }
    );
  }
}
