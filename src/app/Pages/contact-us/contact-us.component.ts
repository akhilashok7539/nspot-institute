import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactusform : FormGroup;
  constructor(private fb:FormBuilder,private apiservice:ApiService,private toaster:ToastrService) { 
    this.contactusform =this.fb.group({
      Subject:['',Validators.required],
      Name:['',Validators.required],
      Email:['',Validators.required],
      Message:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  get f() { return this.contactusform.controls; }
  onSubmit()
  {
    this.apiservice.doPostRequest("institute/sendHelpDeskMail",this.contactusform.value).subscribe(
      data =>{
        this.toaster.success("Mail sent to help desk.! They will reachout you soon.")
        this.contactusform.reset()
      },
      error =>{
        this.toaster.error("Unable to sent mail")
      }
    )
  }
}
