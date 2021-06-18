import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  form: FormGroup;
  touched = false;
  galleryItems;
  multiForm: FormData = new FormData();
  instituteId = this.authService.userProfile.userType;
  baseApiUrl = environment.baseApiUrl;
  ngOnInit(): void {
    this.loadData();
    this.form = this.formBuilder.group({
      galleryFile: ['', [Validators.required]],
      galleryLabel: ['', [Validators.required]]
    });
  }

  // loading images
  loadData(): void {
    console.log(this.instituteId)
    this.apiService.doGetRequest(endPoints.Get_gallery + this.instituteId).subscribe((returnData: any) => {
      this.galleryItems = returnData.data;
      console.log(this.galleryItems);
    });
  }

  // Handling the file change events to append the file with the submitting object
  onchangeFile(controlname, event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 200000) {
        this.toastr.error("File size must be less than 200kB");
        this.multiForm.delete(controlname);
        this.form.controls[controlname].setValue("");
      }
      else {
        this.multiForm.delete(controlname)
        this.multiForm.append(controlname, file, file.name);
      }
    }
  }
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      const formData = this.form.value;
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
      this.multiForm.delete('galleryLabel');

      this.multiForm.append('galleryLabel', formData.galleryLabel);

      this.apiService.doPostRequest_upload(
        endPoints.Create_galleryItem + this.instituteId,
        this.multiForm)
        .subscribe((returnData: any) => {
          console.log(returnData);
          if (returnData.status == true) {
            this.toastr.success('Gallery item addes successfully');
            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.form.reset();
            this.loadData();
          }
          else {
            this.toastr.error(returnData.error.message);
            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.form.reset();
            this.touched = false;
          }

        },
          error => {
            console.error(error);
            const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
            this.toastr.success(message);
            (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
            this.form.reset();
          });

    }

  }
  onImgError(event) { 
    event.target.src = 'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png';
}
  get f() { return this.form.controls; }
}
