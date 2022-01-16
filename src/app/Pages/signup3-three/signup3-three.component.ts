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
      unitOfFile: [''], 
      rankofFile: [''],
      rankofLabel: [''],
      awardsofFile: [''],
      awardsofLabel: [''],
      ratedByLabel: [''],
      ratedByFile: [''],
      accordedByFile: [''],
      accordedByLabel: [''],
      underSectionActofLabel: [''],
      underSectionActofFile: [''],
      establishedOfFile: [''],
      establishedOfLabel: [''],
      boardByLabel: [''],
      boardByFile: [''],
      licenceByLabel: [''],
      licenceByFile: [''],
      collaborationByLabel: [''],
      collaborationByFile: [''],
      unitOfLabel: [''],
      affiliatedToFile: [''],
      affiliatedToLabel: [''],
      recongnizedByFile: [''],
      recongnizedByLabel: [''],
      registeredToFile: [''],
      registeredToLabel: [''],
      approvedByFile: [''],
      approvedByLabel: [''],
      accreditedByFile: [''],
      accreditedByLabel: [''],
      certifiedByFile: [''],
      certifiedByLabel: [''],
      memberOfFile: [''],
      memberOfLabel: [''],

      brochuresFile: [''],
      rulesFile: [''],
      uniformFile: [''],
      // specialFeaturesFile: [''],
      trust: [''],
      group: ['']
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
      console.log(this.form.value);
      const invalid:any = [];
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log("invalid",invalid);

      return invalid;
    } else {
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
      console.log(this.form.valid);

    }
    const formData = this.form.value;
    console.log(this.form.value);


    this.multiForm.append('unitOfLabel', formData.unitOfLabel);
    this.multiForm.append('affiliatedToLabel', formData.affiliatedToLabel);
    this.multiForm.append('recongnizedByLabel', formData.recongnizedByLabel);
    this.multiForm.append('registeredToLabel', formData.registeredToLabel);
    this.multiForm.append('approvedByLabel', formData.approvedByLabel);
    this.multiForm.append('accreditedByLabel', formData.accreditedByLabel);
    this.multiForm.append('certifiedByLabel', formData.certifiedByLabel);
    this.multiForm.append('memberOfLabel', formData.memberOfLabel);
    this.multiForm.append('rankofLabel', formData.rankofLabel);
    this.multiForm.append('awardsofLabel', formData.awardsofLabel);
    this.multiForm.append('ratedByLabel', formData.ratedByLabel);

    this.multiForm.append('accordedByLabel', formData.accordedByLabel);
    this.multiForm.append('underSectionActofLabel', formData.underSectionActofLabel);
    this.multiForm.append('establishedOfLabel', formData.establishedOfLabel);
    this.multiForm.append('boardByLabel', formData.boardByLabel);
    this.multiForm.append('licenceByLabel', formData.licenceByLabel);
    this.multiForm.append('collaborationByLabel', formData.collaborationByLabel);
    this.multiForm.append('trust', formData.trust);
    this.multiForm.append('collaborationByLabel', formData.group);




    // console.warn(multiForm.values(););
    this.apiService.doPostRequest_upload(endPoints.createHeilights + this.instituteId, this.multiForm).subscribe((returnData: any) => {
      console.log(returnData);
      this.multiForm.delete;
      this.toastr.success('Form submission successfull');
      this.router.navigate(['/signup/step-4/' + this.instituteId]);
    },
      error => {
        this.multiForm.delete;

        this.toastr.error(error.error[0].message);
        console.error(error);
      });


  }
  get f() { return this.form.controls; }

}
