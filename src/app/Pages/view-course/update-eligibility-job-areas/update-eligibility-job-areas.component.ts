import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-eligibility-job-areas',
  templateUrl: './update-eligibility-job-areas.component.html',
  styleUrls: ['./update-eligibility-job-areas.component.css']
})
export class UpdateEligibilityJobAreasComponent implements OnInit {
  form: FormGroup;
  dataResponse:any=[];
  institutecourseId;
  multiForm: FormData = new FormData();
  touched = false;

  constructor(private fb: FormBuilder,private apiservice:ApiService,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // instituteCourseId: ['', [Validators.required]],
      jobAreas: ['', ],
      jobPositions: ['',],
      salaryRange: ['', ],
      hasPlacementAssistant: [false ],
      recruiters: ['', ],
      eligibiliyInString: ['', ],
      agebar: ['', ],
      ageLimit: ['', ],
      academicqualifications: ['',],
      entranceexam: ['', ],

    })
    this.dataResponse = JSON.parse(sessionStorage.getItem("eligilibility"))
    console.log(this.dataResponse['Institute_Course']['day']);
    
    this.form.controls['jobAreas'].setValue(this.dataResponse['Institute_Course']['jobAreas']);
    this.form.controls['jobPositions'].setValue(this.dataResponse['Institute_Course']['jobPositions']);
    this.form.controls['salaryRange'].setValue(this.dataResponse['Institute_Course']['salaryRange']);
    this.form.controls['hasPlacementAssistant'].setValue(this.dataResponse['Institute_Course']['hasPlacementAssistant']);
    this.form.controls['recruiters'].setValue(this.dataResponse['Institute_Course']['recruiters']);
    this.form.controls['eligibiliyInString'].setValue(this.dataResponse['Institute_Course']['eligibiliyInString']);
    this.form.controls['agebar'].setValue(this.dataResponse['Institute_Course']['agebar']);
    this.form.controls['ageLimit'].setValue(this.dataResponse['Institute_Course']['ageLimit']);
    this.form.controls['academicqualifications'].setValue(this.dataResponse['Institute_Course']['academicqualifications']);
    this.form.controls['entranceexam'].setValue(this.dataResponse['Institute_Course']['entranceexam']);
    this.institutecourseId = this.dataResponse['instituteCourseId'];
  }
  get f() { return this.form.controls; }


  onSubmit()
  {
    // touched = true;
    const formData = this.form.value;

    this.multiForm.append("jobAreas",formData.jobAreas)
    this.multiForm.append("jobPositions",formData.jobPositions)
    this.multiForm.append("salaryRange",formData.salaryRange)
    this.multiForm.append("hasPlacementAssistant",formData.hasPlacementAssistant)
    this.multiForm.append("recruiters",formData.recruiters)
    this.multiForm.append("eligibiliyInString",formData.eligibiliyInString)
    this.multiForm.append("agebar",formData.agebar)
    this.multiForm.append("ageLimit",formData.ageLimit)
    this.multiForm.append("academicqualifications",formData.academicqualifications)
    this.multiForm.append("entranceexam",formData.entranceexam)


    this.apiservice.doPostRequest_upload(`institute/course/update/` + this.institutecourseId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toaster.success('Course Updated successfull');
        this.router.navigate(['/institute/courses-listed']);
      },
        error => {
          this.toaster.error(error.error[0].message);
          console.error(error);
        });

  }
}
