import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-download',
  templateUrl: './update-download.component.html',
  styleUrls: ['./update-download.component.css']
})
export class UpdateDownloadComponent implements OnInit {

  multiForm: FormData = new FormData();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private authService:AuthService
  ) { }
  instituteId: number;
  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.instituteId = this.authService.instituteProfile.id;;
    this.form = this.formBuilder.group({
      // unitOfFile: [''], // now not in forms


      brochuresFile: ['', [Validators.required]],
      rulesFile: ['', [Validators.required]],
      uniformFile: ['', [Validators.required]],
      specialFeaturesFile: ['', [Validators.required]],
      recruitmentInfoFile: ['', [Validators.required]],
      scholrshopinfoFile: ['', [Validators.required]],

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

  // submitting the multipart data to the api
  onSubmit(): void {

    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    
    // console.warn(this.multiForm.getAll('affiliatedToFile'));
    this.apiService.doPutRequest(`institute/highlights/update/` + this.instituteId, this.multiForm).subscribe((returnData: any) => {
      console.log(returnData);
      this.toastr.success('Updated successfull');
      this.router.navigate(['/institute/dashboard']);
    },
      error => {
        this.toastr.error(error.error[0].message);
        console.error(error);
      });


  }
  get f() { return this.form.controls; }

}
