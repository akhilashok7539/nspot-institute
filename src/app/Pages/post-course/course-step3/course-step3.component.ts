import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-course-step3',
  templateUrl: './course-step3.component.html',
  styleUrls: ['./course-step3.component.css']
})
export class CourseStep3Component implements OnInit {
  multiForm: FormData = new FormData();
  eligiblity;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
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
      eligibiliyInString: ['', [Validators.required]],
      agebar: ['', ],
      ageLimit: ['', [Validators.required]],
      academicqualifications: ['', [Validators.required]],
      entranceexam: ['', ],

    });
  }

  // submitting the form data to the api
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.multiForm.append("eligibiliyInString", this.form.value.eligibiliyInString);
    this.multiForm.append("agebar", this.form.value.agebar);
    this.multiForm.append("ageLimit", this.form.value.ageLimit);
    this.multiForm.append("academicqualifications", this.form.value.academicqualifications);
    this.multiForm.append("entranceexam", this.form.value.entranceexam);


    this.apiService.doPostRequest_upload(endPoints.Update_course + this.courseId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Form submission successfull');
        // this.router.navigate(['/']);

        this.router.navigate(['/institute/post/course/step-4/' + this.courseId]);
      },
        error => {
          // this.multiForm.delete();
          this.multiForm = new FormData();
          this.toastr.error(error.error[0].message);
          console.error(error);
          this.spinner.hide();
      //  (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('enabled', '');

        });

  }
  get f() { return this.form.controls; }

}
