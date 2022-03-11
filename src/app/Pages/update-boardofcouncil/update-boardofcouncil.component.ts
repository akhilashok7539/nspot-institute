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
      unitOfFile: [''], // now not in forms
      rankofFile: ['', ],
      rankofLabel: ['', ],
      awardsofFile: ['', ],
      awardsofLabel: ['', ],
      ratedByLabel: ['', ],
      ratedByFile: ['', ],
      accordedByFile: ['', ],
      accordedByLabel: ['', ],
      underSectionActofLabel: ['', ],
      underSectionActofFile: ['', ],
      establishedOfFile: ['', ],
      establishedOfLabel: ['', ],
      boardByLabel: ['', ],
      boardByFile: ['', ],
      licenceByLabel: ['', ],
      licenceByFile: ['', ],
      collaborationByLabel: ['', ],
      collaborationByFile: ['', ],
      unitOfLabel: ['', ],
      affiliatedToFile: ['', ],
      affiliatedToLabel: ['', ],
      recongnizedByFile: ['', ],
      recongnizedByLabel: ['', ],
      registeredToFile: ['', ],
      registeredToLabel: ['', ],
      approvedByFile: ['', ],
      approvedByLabel: ['', ],
      accreditedByFile: ['', ],
      accreditedByLabel: ['', ],
      certifiedByFile: ['', ],
      certifiedByLabel: ['', ],
      memberOfFile: ['', ],
      memberOfLabel: ['' ],
      trust:[''],
      group:['']
      // brochuresFile: ['', ],
      // rulesFile: ['', ],
      // uniformFile: ['', ],

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
      if(returnData.data != null)
      {
        this.form.controls['rankofLabel'].setValue(this.boardOfCouncilInfo['rankofLabel']);
        this.form.controls['awardsofLabel'].setValue(this.boardOfCouncilInfo['awardsofLabel']);
        this.form.controls['ratedByLabel'].setValue(this.boardOfCouncilInfo['ratedByLabel']);
        this.form.controls['accordedByLabel'].setValue(this.boardOfCouncilInfo['accordedByLabel']);
        this.form.controls['unitOfLabel'].setValue(this.boardOfCouncilInfo['unitOfLabel']);
  
        this.form.controls['underSectionActofLabel'].setValue(this.boardOfCouncilInfo['underSectionActofLabel']);
  
        this.form.controls['establishedOfLabel'].setValue(this.boardOfCouncilInfo['establishedOfLabel']);
        this.form.controls['boardByLabel'].setValue(this.boardOfCouncilInfo['boardByLabel']);
  
        
         this.form.controls['affiliatedToLabel'].setValue(this.boardOfCouncilInfo['affiliatedToLabel']);
         this.form.controls['recongnizedByLabel'].setValue(this.boardOfCouncilInfo['recongnizedByLabel']);
         this.form.controls['registeredToLabel'].setValue(this.boardOfCouncilInfo['registeredToLabel']);
         this.form.controls['approvedByLabel'].setValue(this.boardOfCouncilInfo['approvedByLabel']);
         this.form.controls['accreditedByLabel'].setValue(this.boardOfCouncilInfo['accreditedByLabel']);
         this.form.controls['certifiedByLabel'].setValue(this.boardOfCouncilInfo['certifiedByLabel']);
         this.form.controls['memberOfLabel'].setValue(this.boardOfCouncilInfo['memberOfLabel']);
  
         this.form.controls['licenceByLabel'].setValue(this.boardOfCouncilInfo['licenceByLabel']);
         this.form.controls['collaborationByLabel'].setValue(this.boardOfCouncilInfo['collaborationByLabel']);
      
         
         this.form.controls['trust'].setValue(this.boardOfCouncilInfo['trust']);
         this.form.controls['group'].setValue(this.boardOfCouncilInfo['group']);
      }
      
       

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
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
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
    this.multiForm.append('group', formData.group);

    // console.warn(this.multiForm.getAll('affiliatedToFile'));
    if(this.boardOfCouncilInfo != null)
    {
      this.apiService.doPutRequest(`institute/boardOfCouncil/update/` + this.boardOfCouncilInfo['id'], this.multiForm).subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Updated successfull');
        this.router.navigate(['/institute/dashboard']);
      },
        error => {
          this.toastr.error(error.error[0].message);
          console.error(error);
        });
    }
    else{
      this.apiService.doPostRequest_upload(endPoints.createHeilights + this.instituteId, this.multiForm).subscribe((returnData: any) => {
        console.log(returnData);
        this.multiForm.delete;
        this.toastr.success('Updated successfull');
        this.router.navigate(['/institute/dashboard']);
      },
        error => {
          this.multiForm.delete;
  
          this.toastr.error(error.error[0].message);
          console.error(error);
        });
    }

    


  }
  get f() { return this.form.controls; }
}
