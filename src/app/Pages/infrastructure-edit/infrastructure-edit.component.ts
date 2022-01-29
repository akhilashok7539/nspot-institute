import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-infrastructure-edit',
  templateUrl: './infrastructure-edit.component.html',
  styleUrls: ['./infrastructure-edit.component.css']
})
export class InfrastructureEditComponent implements OnInit {
  form: FormGroup;
  instituteId = this.authService.instituteProfile.id;
  detailsList;
  constructor(private toaster: ToastrService, private authService: AuthService,
    private router: Router,
    private apiservice: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      areaOfCampus: ['', Validators.required],
      totalStudentStrength: ['', Validators.required],
      studentTeacherRatio: ['', Validators.required],
      noOfTeachers: ['', Validators.required],
      noOfClassRoom: ['', Validators.required],
      instructionLanguage: [''],
      sports: [''],
      indoorGames: [''],
      outdoorGames: [''],
      performingArts: [''],
      visualArts: [''],
      campusEvents: [''],
      campusRecruitment: [false],
      library: [false],
      lab: [false],
      digitalClassRoom: [false],
      acClassRom: [false],
      canteen: [false],
      auditorium: [false],
      medicalAid: [false],
      cctv: [false],
      playGround: [false],
      gym: [false],
      pool: [false],
      communityService: [false],
      loanAssistance: [false],
      campusSecurity: [false],
      id:[''],
      instituteId :['']
    })
    // this.instituteId = this.authService.instituteProfile.id;
    this.form.controls['instituteId'].setValue(this.instituteId)

    this.getDetailbyInstituteId();
  }
  getDetailbyInstituteId()
  {
    this.apiservice.doGetRequest(`instituteInfraStructure/byInstituteId/` + this.instituteId).subscribe(
      data => {
        this.detailsList = data['data'][0];
        console.log(this.detailsList);
        // this.form.controls['nearestAirPort'].setValue(this.detailsList.nearestAirPort);
        // this.form.controls['nearestRailWayStation'].setValue(this.detailsList.nearestBusStation);
        // this.form.controls['nearestBusStation'].setValue(this.detailsList.nearestRailWayStation);
        // this.form.controls['currentLatitude'].setValue(this.detailsList.currentLatitude);
        // this.form.controls['currentLongitude'].setValue(this.detailsList.currentLongitude);
        // this.form.controls['id'].setValue(this.detailsList.id);
        if (this.detailsList != undefined) {
          this.form.patchValue(this.detailsList)
  
          }
      },
      error => {

      }
    )
  }
  onSubmit() {
    if (this.detailsList === undefined) {
      // post req
      delete this.form.value['id']
      console.log(this.form.value);
      this.apiservice.doPostRequest("instituteInfraStructure/create",this.form.value).subscribe((returnData: any) => {
        console.log(returnData)
        this.toaster.success("Data Updated Sucessfully")
        this.router.navigate(['/institute/dashboard'])
      }, error => {
        console.error(error);
        this.toaster.error('Failed to Updated Sucessfully')
        this.router.navigate(['/institute/dashboard'])
      });
    }
    else {
      // put req
      delete this.form.value['instituteId']
      console.log(this.form.value);
      this.apiservice.doPostRequest("instituteInfraStructure/update",this.form.value).subscribe((returnData: any) => {
        console.log(returnData)
        this.toaster.success("Data Updated Sucessfully")
        this.router.navigate(['/institute/dashboard'])
        this.getDetailbyInstituteId();
      }, error => {
        console.error(error);
        this.toaster.error('Failed to Updated Sucessfully')
        this.router.navigate(['/institute/dashboard'])
      });
    }
  }
}
