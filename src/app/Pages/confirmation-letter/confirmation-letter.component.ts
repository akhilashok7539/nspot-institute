import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-confirmation-letter',
  templateUrl: './confirmation-letter.component.html',
  styleUrls: ['./confirmation-letter.component.css']
})
export class ConfirmationLetterComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  applicationId;
  studentDetails:any=[];
  responselist:any = [];
  courseName;
  courseId;
  courseFeelist:any=[];
  admissionOfficerList:any=[];
  institutelist:any=[];
  constructor(private activaterouterparams:ActivatedRoute,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.activaterouterparams.paramMap.subscribe(
      data =>{
        console.log(data['params'].applicationId);
        this.applicationId=data['params'].applicationId;
        this.getstudnetdetails();
      }
    )
  }
  getstudnetdetails()
  {
    this.apiservice.doGetRequest('applicationForm/confirationLetter/'+this.applicationId).subscribe(
      data =>{
        this.responselist =data['data'];
        this.courseId =this.responselist['Institute_Course'].id
        this.studentDetails = JSON.parse(data['data'].formFieldValues)
        this.courseFeelist = data['courseFee'];
        this.admissionOfficerList = data['admissionOfficer'];
        this.institutelist= data['institute'];
        console.log(this.studentDetails);
        this.getcourseName();

    },
      error =>{

      }
    )
  } 
  download()
  {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    doc.html(pdfTable, {
      callback: function (doc) {
        doc.save('ApplicationForm.pdf');
      },
      margin: [80,80, 80,80],
      html2canvas: { scale: .18 },
    });

  }

  coursfeedetailsaftercreate(razorpayOrder_id)
  {
    let req = {
      "orderId":razorpayOrder_id
    }
    this.apiservice.doPostRequest('payment/courseFee/order',req).subscribe(
      data =>{
      // this.amounttopaied = data['order'].amount;
      // console.log( this.amounttopaied);
      return data['order'].amount
      
      },
      error =>{

      }
    )
  }
  getcourseName()
  {
    this.apiservice.doGetRequest('institute/course/courseName/'+this.courseId).subscribe(
      data =>{
        this.courseName = data['CourseName']
      }
    )
  }
}