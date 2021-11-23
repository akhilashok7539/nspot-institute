import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  form: FormGroup;
  touched = false;
  instituteTypes;
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.login, formData).subscribe((returnData: any) => {
      if (returnData.status === true) {
        this.toastr.success('Login successfull');
        this.authService.setUser(returnData.data);
        this.router.navigate([`/institute/dashboard`]);
      }
      else {
        this.toastr.error(returnData.error.message);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
      }
    },
      error => {
        console.error(error.error.error.message);
        this.toastr.error(error.error.error.message);
        // (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
      });

  }

  get f() { return this.form.controls; }
}
