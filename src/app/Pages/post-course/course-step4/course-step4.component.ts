import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-step4',
  templateUrl: './course-step4.component.html',
  styleUrls: ['./course-step4.component.css']
})
export class CourseStep4Component implements OnInit {
  multiForm: FormData = new FormData();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }
  instituteId: number;
  courseId: number;
  form: FormGroup;
  touched = false;

  ngOnInit(): void {
    this.courseId = _.parseInt(this.route.snapshot.paramMap.get('courseId'));
    this.instituteId = this.authService.instituteProfile.id;
    this.form = this.formBuilder.group({
      instituteCourseId: [this.courseId, [Validators.required]],
      jobAreas: ['', [Validators.required]],
      jobPositions: ['', [Validators.required]],
      salaryRange: ['', [Validators.required]],
      hasPlacementAssistant: ['', [Validators.required]],
      recruiters: ['', [Validators.required]],
      accept: [false, [Validators.required]],
    });
  }

  // submitting the form data to the api
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    // const formData = this.form.value;
    // this.multiForm = this.form.value;
    this.multiForm.append("jobAreas",this.form.value.jobAreas)
    this.multiForm.append("jobPositions",this.form.value.jobPositions)
    this.multiForm.append("salaryRange",this.form.value.salaryRange)
    this.multiForm.append("hasPlacementAssistant",this.form.value.hasPlacementAssistant)
    this.multiForm.append("recruiters",this.form.value.recruiters)

    this.apiService.doPostRequest_upload(endPoints.Update_course + this.courseId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Form submission successfull');
        // this.router.navigate(['/']);

        this.router.navigate(['/institute/courses-listed']);
      },
        error => {
          this.toastr.error(error.error[0].message);
          console.error(error);
        });


  }
  get f() { return this.form.controls; }

}
