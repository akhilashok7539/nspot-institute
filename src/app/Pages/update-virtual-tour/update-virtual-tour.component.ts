import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-update-virtual-tour',
  templateUrl: './update-virtual-tour.component.html',
  styleUrls: ['./update-virtual-tour.component.css']
})
export class UpdateVirtualTourComponent implements OnInit {
  multiForm: FormData = new FormData();
  instituteId;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private authservice:AuthService,
  ) { }

  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.instituteId = this.authservice.userProfile.userId;
    this.form = this.formBuilder.group({
      campusOverview: ['',],
      classRoom: [''],
      lab: [''],
      library: [''],
      recreationalArea: [''],
      hostel: [''],
    });
  }
  // Handling the file change events to append the file with the submitting object
  onchangeFile(controlname, event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 2000000) {
        this.toastr.error("File size must be less than 2MB");
        this.multiForm.delete(controlname);
        this.form.controls[controlname].setValue("");
      }
      else {
        this.multiForm.delete(controlname)
        this.multiForm.append(controlname, file, file.name);
      }
    }
  }

  // submitting the multipart data to the api
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;


    

    this.apiService.doPutRequest(`institute/virtual-tour/update/` + this.instituteId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Updated Successful');
        this.router.navigate(['/institute/dashboard']);
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.success(message);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });


  }
  get f() { return this.form.controls; }
}
