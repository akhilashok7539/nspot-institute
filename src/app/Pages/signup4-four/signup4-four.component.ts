import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup4-four',
  templateUrl: './signup4-four.component.html',
  styleUrls: ['./signup4-four.component.css'],
})
export class Signup4FourComponent implements OnInit {
  multiForm: FormData = new FormData();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }
  instituteId: number;
  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
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

      declaration: ['', [Validators.required]],
      accept: ['', [Validators.required]],

    });
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

    this.apiService.doPostRequest_upload(endPoints.socialMediaAndVirtualTour + this.instituteId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Registration Successful');
        this.router.navigate(['/login']);
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.success(message);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });


  }
  get f() { return this.form.controls; }
}
