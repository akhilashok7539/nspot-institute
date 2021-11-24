import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPasswordValidator } from "./custom.validator";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userdetails:any=[];
  userId;
  constructor(private fb: FormBuilder,private apiservice:ApiService,private router:Router) {}

  ngOnInit() {
   
    this.registerForm = this.fb.group(
      {
        userId:["",Validators.required],
        password: ["",Validators.required],
        confirmPassword: ["",Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
    // this.registerForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.valid);
    if(this.registerForm.valid)
    {
      let req = {
        "newPassword":this.registerForm.value['confirmPassword']
      }
      this.apiservice.doPostRequest("user/reset-password/byUserName/"+this.registerForm.value['userId'],req).subscribe(
        data =>{
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
        error =>{

        }
      )
    }
    
  }
}
