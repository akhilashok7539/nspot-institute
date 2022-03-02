import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-update-virtual-tour',
  templateUrl: './update-virtual-tour.component.html',
  styleUrls: ['./update-virtual-tour.component.css']
})
export class UpdateVirtualTourComponent implements OnInit {
  multiForm: FormData = new FormData();
  socialForm: FormData = new FormData();
  instituteId;
  virtualTour: any = [];
  socialmedia: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private authservice: AuthService,
  ) { }

  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.instituteId = this.authservice.instituteProfile.id;
    this.form = this.formBuilder.group({
      campusOverview: [''],
      classRoom: [''],
      lab: [''],
      library: [''],
      recreationalArea: [''],
      hostel: [''],

      // website: [''],
      youtube: [''],
      twitter: [''],
      instagram: [''],
      linkedIn: [''],
      facebook: [''],
      // other: [''],
      campusTourVideoLink: [''],
      classRoomVideoLink: [''],
      labTourVideoLink: [''],
      hostelTourVideoLink: [''],
      recreationAreaTourVideoLink: [''],
      libraryTourVideoLink: [''],

    });
    this.loadData();
  }
  // Handling the file change events to append the file with the submitting object
  onchangeFile(controlname, event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 2000000) {
        this.toastr.error("File size must be less than 2MB");
        this.multiForm.delete(controlname);
        this.form.controls[controlname].setValue("");
      }
      else {
        this.multiForm.delete(controlname)
        this.multiForm.append(controlname, file, file.name);
      }
    }
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

    this.multiForm.delete('youtube');
    this.multiForm.delete('twitter');
    this.multiForm.delete('instagram');
    this.multiForm.delete('linkedIn');
    this.multiForm.delete('facebook');
    this.multiForm.delete('other');

    this.multiForm.append('youtube', formData.youtube);
    this.multiForm.append('twitter', formData.twitter);
    this.multiForm.append('instagram', formData.instagram);
    this.multiForm.append('linkedIn', formData.linkedIn);
    this.multiForm.append('facebook', formData.facebook);
    // this.multiForm.append('other', formData.other);
    this.multiForm.append('campusTourVideoLink', formData.campusTourVideoLink);
    this.multiForm.append('classRoomVideoLink', formData.classRoomVideoLink);
    this.multiForm.append('labTourVideoLink', formData.labTourVideoLink);
    this.multiForm.append('hostelTourVideoLink', formData.hostelTourVideoLink);
    this.multiForm.append('libraryTourVideoLink', formData.libraryTourVideoLink);
    this.multiForm.append('recreationAreaTourVideoLink', formData.recreationAreaTourVideoLink);


    this.apiService.doPutRequest(`institute/virtual-tour/update/` + this.virtualTour['id'], this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Updated Successful');
        this.router.navigate(['/institute/dashboard']);
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.success(message);
          //(document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });
    this.socialForm.append('youtube', formData.youtube);
    this.socialForm.append('twitter', formData.twitter);
    this.socialForm.append('instagram', formData.instagram);
    this.socialForm.append('linkedIn', formData.linkedIn);
    this.socialForm.append('facebook', formData.facebook);
    let req ={
      youtube:formData.youtube,
      twitter:formData.twitter,
      instagram:formData.instagram,
      linkedIn:formData.linkedIn,
      facebook:formData.facebook,

    }
    this.apiService.doPutRequest(`institute/social-media/` + this.socialmedia['id'],req)

      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Updated Successful');
        this.router.navigate(['/institute/dashboard']);
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.success(message);
          //(document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });
  }
  get f() { return this.form.controls; }

  loadData() {
    this.apiService.doGetRequest("institute/virtual-tour/" + this.instituteId).subscribe(
      data => {
        this.virtualTour = data['data']
        this.form.controls['campusTourVideoLink'].setValue(this.virtualTour['campusTourVideoLink']);
        this.form.controls['classRoomVideoLink'].setValue(this.virtualTour['classRoomVideoLink']);
        this.form.controls['hostelTourVideoLink'].setValue(this.virtualTour['hostelTourVideoLink']);
        this.form.controls['labTourVideoLink'].setValue(this.virtualTour['labTourVideoLink']);
        this.form.controls['libraryTourVideoLink'].setValue(this.virtualTour['libraryTourVideoLink']);
        this.form.controls['recreationAreaTourVideoLink'].setValue(this.virtualTour['recreationAreaTourVideoLink']);
        this.form.controls['campusTourVideoLink'].setValue(this.virtualTour['campusTourVideoLink']);


      },
      error => {

      }
    )
    this.apiService.doGetRequest("institute/social-media/" + this.instituteId).subscribe(
      data => {
        this.socialmedia = data['data']
        this.form.controls['youtube'].setValue(this.socialmedia['youtube']);
        this.form.controls['twitter'].setValue(this.socialmedia['twitter']);
        this.form.controls['instagram'].setValue(this.socialmedia['instagram']);
        this.form.controls['linkedIn'].setValue(this.socialmedia['linkedIn']);
        this.form.controls['facebook'].setValue(this.socialmedia['facebook']);



      },
      error => {

      })

  }
}
