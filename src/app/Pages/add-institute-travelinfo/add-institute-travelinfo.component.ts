import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-institute-travelinfo',
  templateUrl: './add-institute-travelinfo.component.html',
  styleUrls: ['./add-institute-travelinfo.component.css']
})
export class AddInstituteTravelinfoComponent implements OnInit {
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
      instituteId: ['']
    })
    this.instituteId = this.authService.instituteProfile.id;

    // this.getDetailbyInstituteId();
    this.form.controls['instituteId'].setValue(this.instituteId)
  }
 
  onSubmit() {
    console.log(this.form.value);
    this.apiservice.doPostRequest(`instituteTravelInfo/create`, this.form.value).subscribe(
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