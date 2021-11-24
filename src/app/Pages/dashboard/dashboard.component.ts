import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  instituteId = this.authService.userProfile.userId;
  instituteInfo;
  boardOfCouncilInfo;
  highlights;
  socialLinks;
  travelinformations;
  virtualTours;
  baseApiUrl = environment.baseApiUrl;

  ngOnInit(): void {
    this.instituteId = this.authService.instituteProfile.userId;
    let tempinstId = this.authService.instituteProfile.id;

    this.loadInstituteInfo();
    // fetching boardof council details
    this.apiService.doGetRequest(endPoints.Get_boardOfCouncil + tempinstId).subscribe((returnData: any) => {
      this.boardOfCouncilInfo = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details');
    });
    this.apiService.doGetRequest(`institute/virtual-tour/` + tempinstId).subscribe((returnData: any) => {
      this.virtualTours = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch virtual tour details');
    });
    // fetching highlights
    this.apiService.doGetRequest(endPoints.Get_highlights + tempinstId).subscribe((returnData: any) => {
      this.highlights = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    // fetching social links
    this.apiService.doGetRequest(endPoints.Get_socialMedia + tempinstId).subscribe(returnData => {
      this.socialLinks = returnData;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
    // fetching travel informations

    this.apiService.doGetRequest('instituteTravelInfo/byInstituteId/' + tempinstId).subscribe(returnData => {
      console.log(returnData);
      
      this.travelinformations = returnData['data'][0];
      console.log(this.travelinformations);
      
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
  }

  loadInstituteInfo() {
    // fetching institute details
    this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.instituteId).subscribe((returnData: any) => {
      console.log(returnData)
      this.instituteInfo = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
  }

  onProfileChange(event, instituteId) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let multiForm: FormData = new FormData();

      if (file.size > 200000) {
        this.toastr.error("File size must be less than 200kB");
        multiForm.delete('file');
        event.target.value = ""
        return;
      }
      else {
        multiForm.delete('file')
        multiForm.append('file', file, file.name);
        multiForm.delete('instituteId');
        multiForm.append('instituteId', instituteId);

        this.apiService.doPostRequest_upload(
          endPoints.UploadProfilePhotoFile, multiForm)
          .subscribe((returnData: any) => {
            console.log(returnData);
            if (returnData.status == true) {
              this.loadInstituteInfo();
              this.toastr.success("Profile picture uploaded")
            }
            else {
              this.toastr.error("Profile upload failed")
            }
          }, error => {
            console.log(error)
            this.toastr.error("Something went wrong")
          });
      }
    }
  }
  edit() {
    this.router.navigate(['/institute/edit-institute/' + this.instituteId])
  }
  view(s) {
    let req = {
      transportationInfo: s.transportationInfo,
      hostalAnnualFee: s.hostalAnnualFee,
      foodAvailableAtHostel: s.foodAvailableAtHostel,
      haveGirlsHostel: s.haveGirlsHostel,
      haveBoysHostel: s.haveBoysHostel
    }
    sessionStorage.setItem("feeandinfo", JSON.stringify(req))
    this.router.navigate(['/institute/update-hostel'])

  }
  editinfra(s) {

    this.router.navigate(['/institute/infrastructure-edit/'])

  }
  editravel() {
    this.router.navigate(['/institute/travelinfo-edit/'])


  }
  add()
  {
    
    this.router.navigate(['/institute/travelinfo-add'])
  }
}
