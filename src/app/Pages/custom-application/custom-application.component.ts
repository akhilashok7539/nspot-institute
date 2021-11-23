import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';

import { ApplicationFormService } from '../../services/application-form.service'
import { AuthService } from 'src/app/services/auth.service';

export interface AdditionalFormControls {
  personalInfo: [],
  education: [],
  entrance: [],
  certificates: [],
}

type data = {
  title: string;
}[];

@Component({
  selector: 'app-custom-application',
  templateUrl: './custom-application.component.html',
  styleUrls: ['./custom-application.component.css']
})

export class CustomApplicationComponent implements OnInit {
  additionalFormControls: AdditionalFormControls;
  form: FormGroup;
  additionalPersonal: FormGroup;
  additionalEducation: FormGroup;
  additionalExam: FormGroup;
  additionalCertificate: FormGroup;
  public arrayItems: data = [];

  additionalField = {
    personalInfo: [],
    education: [],
    entrance: [],
    certificates: []
  }
  arr1:any=[];
  instituteId = this.authService.instituteProfile.id;
  personalInfoArray1:any = [];
  constructor(
    private applicationFormService: ApplicationFormService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  additionalFileds;
  formControls = this.applicationFormService.formControls;
  ngOnInit(): void {
    // this.additionalFormControls.certificates
    // this.loadNewFields();
    this.form = this.formBuilder.group({
      
      instituteId: [this.instituteId],
      personalInfo: this.formBuilder.group({
        courseName: [true],
        stream: [true],
        isHosteler: [true],
        adharNumber: [true],
        fullName: [true],
        dob: [true],
        age: [true],
        gender: [true],
        mothersName: [true],
        mothersOccupation: [true],
        mothersEmail: [true],
        mothersPhoneNumber: [true],
        fathersName: [true],
        fathersOccupation: [true],
        fathersEmail: [true],
        fathersPhoneNumber: [true],
        guardiansName: [true],
        gaurdiansAddress: [true],
        gaurdiansEmail: [true],
        gaurdiansPhoneNumber: [true],
        isDifferentlyAbled: [true],
        differentlyAbledCertFile: [true],
        religion: [true],
        cast: [true],
        visibleMark1: [true],
        visibleMark2: [true],
        isIndian: [true],
        isNRI: [true],
        isFilledByFather: [true],
        additionalFields: this.formBuilder.group({

        }),
        
      }),
   
    
      permanentAddress: this.formBuilder.group({
        permanentAddressLine1: [true],
        permanentAddressLine2: [true],
        permanentAddressLine3: [true],
        permanentCountry: [true],
        permanentState: [true],
        permanentDistrict: [true],
        permanentPin: [true],
        permanentTelephoneSTDCode: [true],
        permanentTelephone: [true],
        permanentMobile: [true],
      }),
      communicationAddress: this.formBuilder.group({
        communicationAddressLine1: [true],
        communicationAddressLine2: [true],
        communicationAddressLine3: [true],
        communicationCountry: [true],
        communicationState: [true],
        communicationDistrict: [true],
        communicationPin: [true],
        communicationTelephoneSTDCode: [true],
        communicationTelephone: [true],
        communicationMobile: [true],
      }),
      education: this.formBuilder.group({
        accademicLevelId: [true],
        schoolName: [true],
        specialization: [true],
        yearOfStudy: [true],
        startDate: [true],
        endDate: [true],
        certificateFile: [true],
        qualificationStatus: [true],
        cgpa: [true],
        // aditionalEducation: this.formBuilder.array([
        //   this.formBuilder.group({
        //     ticked: [true],
        //     fieldName: ['', Validators.required],
        //     field: ['', Validators.required],
        //     type: ['text'],
        //   })
        // ]),
        additionalFields: this.formBuilder.group({

        }),
      }),
      entrance: this.formBuilder.group({
        qualifiedEntrance: [true],
        rollNumber: [true],
        yearOfQualification: [true],
        validUpto: [true],
        cgpa: [true],
        rank: [true],
        // aditionalEntrance: this.formBuilder.array([
        //   this.formBuilder.group({
        //     ticked: [true],
        //     fieldName: ['', Validators.required],
        //     field: ['', Validators.required],
        //     type: ['text'],
        //   })
        // ]),
        additionalFields: this.formBuilder.group({

        }),
      }),
      certificates: this.formBuilder.group({
        adharCardFile: [true],
        // new
        adharCardFileattested:[true],
        addressProof:[true],
        admissionApplciationLetterFile:[true],
        sslcFileattested: [true],
        sslcmarksheetfile:[true],
        plusTwoCertificateFileattested: [true],
        plusTwoCertificateFileprofessional: [true],
        plusTwoCertificateFileprofessionalattested: [true],
        degreeCertificateFile:[true],
        degreeCertificateFileattested:[true],
        professionaldegreeCertificateFile:[true],
        professionaldegreeCertificateFileattested:[true],
        diplomaCertificateFile:[true],
        diplomaCertificateFileattested:[true],
        pgMasterCertificateFile:[true],
        pgMasterCertificateFileattested:[true],
        phdCertificateFile:[true],
        phdCertificateFileatteseted:[true],
        courseCompletionCertificateFile:[true],
        consolidateMarkListFile:[true],
        originalGradecardFile:[true],
        apptitudeTestFile:[true],
        typingSkillTestFile:[true],
        allotmentLetterFile:[true],
        proofOfEnglishProficiencyFile:[true],
        mothersSignatureFile:[true],
        fathersSignatureFile:[true],
        guardiansSignatureFile:[true],
        aadharcardParentatteseted:[true],
        aadharcardParent:[true],
        passportorvisa:[true],
        hallticketFile:[true],
        previousschoolCollageAttendedCertificateFile:[true],
        sportsCertificateFile:[true],
        nocCertificateFile:[true],
        scCertificate:[true],
        ewsCertificate:[true],
        educationConsessionCertificate:[true],
        relivingCertificate:[true],
        offerletterCertificate:[true],
        medicalCertificate:[true],
        affidavitFile:[true],
        gapCertificate:[true],
        selfDeclarationCertificate:[true],
        recommendationCertificate:[true],
        dischargeCertificate:[true],
        additionalCertificateFile:[true],

        // 
        birthCertificateFile: [true],
        sslcFile: [true],
        plusTwoCertificateFile: [true],
        characterCertificateFile: [true],
        communityCertificateFile: [true],
        conductCertificateFile: [true],
        entranceExamFile: [true],
        experienceCertificateFile: [true],
        differentlyAbledCertificateFile: [true],
        panCardFile: [true],
        passportSizePhotoFile: [true],
        nativityCertificateFile: [true],
        tcFile: [true],
        migrationCertificateFile: [true],
        incomeCertificateFile: [true],

    
        scolarshipFile: [true],
        signatureFile: [true],
        thumbImpressionFile: [true],
        drivingLicenseFile: [true],
        // aditionalCertificates: this.formBuilder.array([
        //   this.formBuilder.group({
        //     ticked: [true],
        //     fieldName: ['', Validators.required],
        //     field: ['', Validators.required],
        //     type: ['file'],
        //   })
        // ]),
        additionalFields: this.formBuilder.group({

        }),
      }),

      entranceExams: this.formBuilder.array([
        this.formBuilder.group({
          qualifiedEntrance: ['', Validators.required],
          rollNumber: ['', Validators.required],
          yearOfQualification: ['', Validators.required],
          cgpa: ['', Validators.required],
          rank: ['', Validators.required],
        })
      ])

    });
    this.loadAdditionalField();
    this.loadRemovedFields();
   
  }

  loadAdditionalField() {
    // return new Promise(resolve => {
      this.apiService.doGetRequest(endPoints.Get_additionalField + this.instituteId).subscribe((returnData: any) => {
        returnData.data.map(element => {
          let additionalFieldObj = {};
          additionalFieldObj[element.fieldName] = element.fieldText
          if (element.formSection == "personalInfo") {
            this.additionalField.personalInfo.push(element)
            console.log("here");
            console.log(this.additionalField.personalInfo);
            
          }
          if (element.formSection == "certificates") {
            this.additionalField.certificates.push(element)
          }
          if (element.formSection == "education") {
            this.additionalField.education.push(element)
          }
          if (element.formSection == "entrance") {
            this.additionalField.entrance.push(element)
          }

          // if (element.formSection != "education" && element.formSection != "entrance") {
            const group = (this.form.controls[element.formSection] as FormGroup).get("additionalFields") as FormGroup;
            const control = this.formBuilder.control(true);
            group.addControl(element.fieldName, control);
            
          // }

        })
        // resolve(true);
      }, error => {
        console.error(error);
      });
    // })
  }
  // loadNewFields(){
  //   this.apiService.doGetRequest(`applicationForm/getAdditional/`+ this.instituteId + '/personalInfo').subscribe((returnData: any) => {

  //      this.personalInfoArray1 = returnData['data'];

  //       let group = {}
  //       this.personalInfoArray1.forEach(element => {
  //         group[element.fieldName] =new FormControl(true);
  //       });
  //       this.form.value['personalInfo'] = new FormGroup(group)
  //       console.log(this.form.value);
        

  //   }, error => {
  //     console.error(error);
  //   });

  // }
  // update(event,form,value){
  //   console.log(form);
  //   console.log(value);
    
  //   const removedFieldObj = {
  //     instituteId: this.instituteId,
  //     formSection: form,
  //     fieldName: value
  //   }
  //   this.apiService.doPostRequest(
  //     `/applicationForm/removedFields/create/`,
  //     removedFieldObj)
  //     .subscribe((returnData: any) => {
  //       console.log(returnData);
  //       if (returnData.status == true) {
  //         this.toastr.success("Field Removed");
  //       }
  //       else {
  //         this.toastr.error(returnData.error.message);
  //       }
  //     },
  //       error => {
  //         console.error(error);
  //         const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
  //         this.toastr.error(message);
  //       });
  // }
  // get demoArray() {
  //   return this.form.get("additionalFileds") as FormArray;
  // }
  // generateFormGroup(baseForm: FormGroup, field): FormGroup|FormControl {
  //   const formGroup = this.formBuilder.group({});
  
  //     Object.keys(field).forEach(function(key) {
  //       console.log("key"+field);
        
  //     formGroup.addControl(field, new FormControl(""));
  //     });
  //     console.log('formGroup',formGroup.value);
  //     return formGroup;
  //   }  
   

  loadRemovedFields() {
    // fetching removed fields
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/personalInfo').subscribe((returnData: any) => {
      const group = this.form.controls['personalInfo'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
      console.log(returnData);
      
    }, error => {
      console.error(error);
    });

    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/additionalFields').subscribe((returnData: any) => {
      console.log(returnData.data);
      const group = (this.form.controls["personalInfo"] as FormGroup).get("additionalFields") as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });

    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/permanentAddress').subscribe((returnData: any) => {
      const group = this.form.controls['permanentAddress'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });

    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/communicationAddress').subscribe((returnData: any) => {
      const group = this.form.controls['communicationAddress'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });

    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/education').subscribe((returnData: any) => {
      const group = this.form.controls['education'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/additionalFields').subscribe((returnData: any) => {
      console.log(returnData.data);
      const group = (this.form.controls["education"] as FormGroup).get("additionalFields") as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/entrance').subscribe((returnData: any) => {
      const group = this.form.controls['entrance'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/additionalFields').subscribe((returnData: any) => {
      console.log(returnData.data);
      const group = (this.form.controls["entrance"] as FormGroup).get("additionalFields") as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/certificates').subscribe((returnData: any) => {
      const group = this.form.controls['certificates'] as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
    this.apiService.doGetRequest(endPoints.Get_removedField + this.instituteId + '/additionalFields').subscribe((returnData: any) => {
      console.log(returnData.data);
      const group = (this.form.controls["certificates"] as FormGroup).get("additionalFields") as FormGroup;
      returnData.data.map(element => {
        group.controls[element.fieldName].setValue(false)
      })
    }, error => {
      console.error(error);
    });
  }
  changeFormaditional(event,section,fieldname){
    console.log(section);
    console.log(fieldname);
    const checked = event.target.checked;
   const removedFieldObj = {
      instituteId: this.instituteId,
      formSection: section,
      fieldName: fieldname
    }
    let endpoint;
    let msg;
    console.log(endpoint, checked)
    if (checked == true) {
      endpoint = endPoints.Remove_removedField
      msg = "Field added to the form"
    }
    else {
      endpoint = endPoints.Create_removedField
      msg = "Field removed"
    }
    this.apiService.doPostRequest(
      endpoint,
      removedFieldObj)
      .subscribe((returnData: any) => {
        console.log(returnData);
        if (returnData.status == true) {
          this.toastr.success(msg);
        }
        else {
          this.toastr.error(returnData.error.message);
        }
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
          this.toastr.error(message);
        });
 
  }
  submitForm(event)
  {
    console.log(event);
    if(event === true)
    {
        this.additionalField.personalInfo = [];
        this.additionalField.certificates = [];
        this.additionalField.education = [];
        this.additionalField.entrance = [];
     
      this.loadAdditionalField();
      this.loadRemovedFields();
      // this.ngOnInit();
      // this.loadAdditionalField();
      // this.loadRemovedFields();
    }
  }






  changeFormItemStatus(event, section) {

    
    const fieldName = event.target.getAttribute('formControlName')
    console.log(event.target);
    
    const checked = event.target.checked;
    const removedFieldObj = {
      instituteId: this.instituteId,
      formSection: section,
      fieldName: fieldName
    }

    let endpoint;
    let msg;
    console.log(endpoint, checked)
    if (checked == true) {
      endpoint = endPoints.Remove_removedField
      msg = "Field added to the form"
    }
    else {
      endpoint = endPoints.Create_removedField
      msg = "Field removed"
    }

    this.apiService.doPostRequest(
      endpoint,
      removedFieldObj)
      .subscribe((returnData: any) => {
        console.log(returnData);
        if (returnData.status == true) {
          this.toastr.success(msg);
        }
        else {
          this.toastr.error(returnData.error.message);
        }
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
          this.toastr.error(message);
        });
  }

  get f() { return this.form.controls; }
}
