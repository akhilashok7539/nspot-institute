import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admission-officers',
  templateUrl: './admission-officers.component.html',
  styleUrls: ['./admission-officers.component.css']
})
export class AdmissionOfficersComponent implements OnInit {

  officerList;
  couresname;
  instituteId = this.authService.instituteProfile.id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // loading images
  loadData(): void {
    this.apiService.doGetRequest(endPoints.Get_admissionOfficerByInstitute + this.instituteId).subscribe((returnData: any) => {
      this.officerList = returnData.data;
      // this.officerList.map(x => x  )
      console.log(this.officerList);

    });
  }
  getcoursename(s)
  {
    return this.apiService.doGetRequest("institute/course/courseName/"+s);
  }
}
