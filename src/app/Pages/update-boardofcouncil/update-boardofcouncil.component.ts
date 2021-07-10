import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-boardofcouncil',
  templateUrl: './update-boardofcouncil.component.html',
  styleUrls: ['./update-boardofcouncil.component.css']
})
export class UpdateBoardofcouncilComponent implements OnInit {
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
  boardOfCouncilInfo:any = [];
  touched = false;
  ngOnInit(): void {
    this.instituteId = this.authService.instituteProfile.id;


    this.form = this.formBuilder.group({
      // unitOfFile: [''], // now not in forms
      unitOfLabel: ['', [Validators.required]],
      affiliatedToFile: ['', [Validators.required]],
      affiliatedToLabel: ['', [Validators.required]],
      recongnizedByFile: ['', [Validators.required]],
      recongnizedByLabel: ['', [Validators.required]],
      registeredToFile: ['', [Validators.required]],
      registeredToLabel: ['', [Validators.required]],
      approvedByFile: ['', [Validators.required]],
      approvedByLabel: ['', [Validators.required]],
      accreditedByFile: ['', [Validators.required]],
      accreditedByLabel: ['', [Validators.required]],
      certifiedByFile: ['', [Validators.required]],
      certifiedByLabel: ['', [Validators.required]],
      memberOfFile: ['', [Validators.required]],
      memberOfLabel: ['', [Validators.required]],


    });
    this.loadData();
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
  loadData()
  {
    this.apiService.doGetRequest(endPoints.Get_boardOfCouncil + this.instituteId).subscribe((returnData: any) => {
      this.boardOfCouncilInfo = returnData.data;
       this.form.controls['unitOfLabel'].setValue(this.boardOfCouncilInfo['unitOfLabel']);
       this.form.controls['affiliatedToLabel'].setValue(this.boardOfCouncilInfo['affiliatedToLabel']);
       this.form.controls['recongnizedByLabel'].setValue(this.boardOfCouncilInfo['recongnizedByLabel']);
       this.form.controls['registeredToLabel'].setValue(this.boardOfCouncilInfo['registeredToLabel']);
       this.form.controls['approvedByLabel'].setValue(this.boardOfCouncilInfo['approvedByLabel']);
       this.form.controls['accreditedByLabel'].setValue(this.boardOfCouncilInfo['accreditedByLabel']);
       this.form.controls['certifiedByLabel'].setValue(this.boardOfCouncilInfo['certifiedByLabel']);
       this.form.controls['memberOfLabel'].setValue(this.boardOfCouncilInfo['memberOfLabel']);
    



    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details');
    });
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
    this.multiForm.delete('unitOfLabel');
    this.multiForm.delete('affiliatedToLabel');
    this.multiForm.delete('recongnizedByLabel');
    this.multiForm.delete('registeredToLabel');
    this.multiForm.delete('approvedByLabel');
    this.multiForm.delete('accreditedByLabel');
    this.multiForm.delete('certifiedByFile');
    this.multiForm.delete('certifiedByLabel');
    this.multiForm.delete('memberOfLabel');

    this.multiForm.append('unitOfLabel', formData.unitOfLabel);
    this.multiForm.append('affiliatedToLabel', formData.affiliatedToLabel);
    this.multiForm.append('recongnizedByLabel', formData.recongnizedByLabel);
    this.multiForm.append('registeredToLabel', formData.registeredToLabel);
    this.multiForm.append('approvedByLabel', formData.approvedByLabel);
    this.multiForm.append('accreditedByLabel', formData.accreditedByLabel);
    this.multiForm.append('certifiedByFile', formData.certifiedByFile);
    this.multiForm.append('certifiedByLabel', formData.certifiedByLabel);
    this.multiForm.append('memberOfLabel', formData.memberOfLabel);

    // console.warn(this.multiForm.getAll('affiliatedToFile'));
    this.apiService.doPutRequest(`institute/boardOfCouncil/update/` + this.instituteId, this.multiForm).subscribe((returnData: any) => {
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
