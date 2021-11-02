import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-admision-number',
  templateUrl: './add-admision-number.component.html',
  styleUrls: ['./add-admision-number.component.css']
})
export class AddAdmisionNumberComponent implements OnInit {
  resposnedata;
  applicationId;
  admisisonidNumber;
  constructor(private router:Router,private apiservice:ApiService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.resposnedata = JSON.parse(sessionStorage.getItem("applciationdata"));
    this.applicationId = this.resposnedata['item'].ApplicationForm_submission.id;
    console.log(this.applicationId);
    
  }

  submit()
  {
    let req = {
      admissionId:this.admisisonidNumber
    }
    this.apiservice.doPutRequest("applicationForm/applications/updateView/"+this.applicationId,req).subscribe(
      data =>{
        this.toaster.success("Admission Number added");
        this.router.navigate(['/institute/studentList'])
      },
      error =>{
        this.toaster.error("unable to add admision number")
      }
    )
  }
}
