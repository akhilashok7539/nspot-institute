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
  instituteId;
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
      campusRecruitment: [''],
      library: [''],
      lab: [''],
      digitalClassRoom: [''],
      acClassRom: [''],
      canteen: [''],
      auditorium: [''],
      medicalAid: [''],
      cctv: [''],
      playGround: [''],
      gym: [''],
      pool: [''],
      communityService: [''],
      loanAssistance: [''],
      campusSecurity: [''],
      id:['']
    })
    this.instituteId = this.authService.instituteProfile.id;

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

      },
      error => {

      }
    )
  }
  onSubmit(){
    
  }
}
