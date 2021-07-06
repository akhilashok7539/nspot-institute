import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {
  multiForm: FormData = new FormData();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }
  instituteId: number;
  form: FormGroup;
  touched = false;
  bankItems;
  ngOnInit(): void {
    this.instituteId = this.authService.userProfile.userId;
    this.loadData();
    this.form = this.formBuilder.group({
      accountNumber: [''],
      name: [''],
      ifsc: [''],
      nickname: [''],
      passbookFile: [''],
      aadharNumber:[''],
      panNumber:[''],
      panFile:[''],
      aadharFile:[''],
    });
  }

  // loading bank details
  loadData(): void {
    this.apiService.doGetRequest(endPoints.Get_bankDetails + this.instituteId).subscribe((returnData: any) => {
      this.bankItems = returnData.data;
      console.log(this.bankItems);
    });
  }

  // Handling the file change events to append the file with the submitting object
  onchangeFile(controlname, event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.multiForm.append(controlname, file, file.name);
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
    this.multiForm.delete('accountNumber');
    this.multiForm.delete('name');
    this.multiForm.delete('ifsc');
    this.multiForm.delete('nickname');

    this.multiForm.append('accountNumber', formData.accountNumber);
    this.multiForm.append('name', formData.name);
    this.multiForm.append('ifsc', formData.ifsc);
    this.multiForm.append('nickname', formData.nickname);
    this.multiForm.append('aadharNumber', formData.aadharNumber);
    this.multiForm.append('panNumber', formData.panNumber);


    this.apiService.doPostRequest_upload(endPoints.Create_bankDetails + this.instituteId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Bank details added successfully.');
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        this.form.reset();
        this.loadData();
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.error(message);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });


  }
  get f() { return this.form.controls; }
}
