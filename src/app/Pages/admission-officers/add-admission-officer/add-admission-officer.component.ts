import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admission-officer',
  templateUrl: './add-admission-officer.component.html',
  styleUrls: ['./add-admission-officer.component.css']
})
export class AddAdmissionOfficerComponent implements OnInit {
  institutecourseList: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }
  instituteId: number;
  form: FormGroup;
  touched = false;

  ngOnInit(): void {
    this.instituteId = this.authService.instituteProfile.id;

    this.form = this.formBuilder.group({
      instituteId: this.instituteId,
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required]],
      phone1: ['', Validators.required],
      phone2: ['', Validators.required],
      admissionDepartment: ['', Validators.required],
      instituteCourseId: ['', Validators.required]
    });
    this.getallcourses()

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

    this.apiService.doPostRequest_upload(endPoints.Create_admissionOfficer, formData)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Admission officer added');
        this.router.navigate(['/institute/admission-officer']);
      },
        error => {
          console.error(error);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.error(message);
        });
  }
  get f() { return this.form.controls; }
  getallcourses() {
    this.apiService.doGetRequest(`institute/courses/` + this.instituteId).subscribe(
      data => {
        this.institutecourseList = data['data']
      },
      error => {

      }
    )
  }
}
