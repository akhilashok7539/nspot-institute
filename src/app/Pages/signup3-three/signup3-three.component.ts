import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup3-three',
  templateUrl: './signup3-three.component.html',
  styleUrls: ['./signup3-three.component.css'],
})
export class Signup3ThreeComponent implements OnInit {
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
      // unitOfFile: [''], // now not in forms
      rankofFile: ['', [Validators.required]],
      rankofLabel: ['', [Validators.required]],
      awardsofFile: ['', [Validators.required]],
      awardsofLabel: ['', [Validators.required]],
      ratedByLabel: ['', [Validators.required]],
      ratedByFile: ['', [Validators.required]],
      accordedByFile: ['', [Validators.required]],
      accordedByLabel: ['', [Validators.required]],
      underSectionActofLabel: ['', [Validators.required]],
      underSectionActofFile: ['', [Validators.required]],
      establishedOfFile: ['', [Validators.required]],
      establishedOfLabel: ['', [Validators.required]],
      boardByLabel: ['', [Validators.required]],
      boardByFile: ['', [Validators.required]],
      licenceByLabel: ['', [Validators.required]],
      licenceByFile: ['', [Validators.required]],
      collaborationByLabel: ['', [Validators.required]],
      collaborationByFile: ['', [Validators.required]],
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

      brochuresFile: ['', [Validators.required]],
      rulesFile: ['', [Validators.required]],
      uniformFile: ['', [Validators.required]],
      specialFeaturesFile: ['', [Validators.required]],

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
    // this.multiForm.append('certifiedByFile', formData.certifiedByFile);
    this.multiForm.append('certifiedByLabel', formData.certifiedByLabel);
    this.multiForm.append('memberOfLabel', formData.memberOfLabel);

    console.warn(this.multiForm.getAll('affiliatedToFile'));
    this.apiService.doPostRequest_upload(endPoints.createHeilights + this.instituteId, this.multiForm).subscribe((returnData: any) => {
      console.log(returnData);
      this.toastr.success('Form submission successfull');
      this.router.navigate(['/signup/step-4/' + this.instituteId]);
    },
      error => {
        this.toastr.error(error.error[0].message);
        console.error(error);
      });


  }
  get f() { return this.form.controls; }

}
