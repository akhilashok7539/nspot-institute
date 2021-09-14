import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-institute-travel-edit',
  templateUrl: './institute-travel-edit.component.html',
  styleUrls: ['./institute-travel-edit.component.css']
})
export class InstituteTravelEditComponent implements OnInit {
  form: FormGroup;
  instituteId;
  detailsList;
  constructor(private toaster: ToastrService, private authService: AuthService,
    private router: Router,
    private apiservice: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nearestAirPort: ['', Validators.required],
      nearestRailWayStation: ['', Validators.required],
      nearestBusStation: ['', Validators.required],
      currentLatitude: ['', Validators.required],
      currentLongitude: ['', Validators.required],
      id: ['']
    })
    this.instituteId = this.authService.instituteProfile.id;

    this.getDetailbyInstituteId();
  }
  getDetailbyInstituteId() {
    this.apiservice.doGetRequest(`instituteTravelInfo/byInstituteId/` + this.instituteId).subscribe(
      data => {
        this.detailsList = data['data'][0];
        console.log(this.detailsList);
        this.form.controls['nearestAirPort'].setValue(this.detailsList.nearestAirPort);
        this.form.controls['nearestRailWayStation'].setValue(this.detailsList.nearestBusStation);
        this.form.controls['nearestBusStation'].setValue(this.detailsList.nearestRailWayStation);
        this.form.controls['currentLatitude'].setValue(this.detailsList.currentLatitude);
        this.form.controls['currentLongitude'].setValue(this.detailsList.currentLongitude);
        this.form.controls['id'].setValue(this.detailsList.id);

      },
      error => {

      }
    )
  }
  onSubmit() {
    console.log(this.form.value);
    this.apiservice.doPostRequest(`instituteTravelInfo/update`, this.form.value).subscribe(
      data => {
        this.toaster.success("Updated Successfully")
        this.router.navigate(['/institute/dashboard'])
      },
      error => {
        this.toaster.error("Unable to update data")
      }
    )
  }
}
