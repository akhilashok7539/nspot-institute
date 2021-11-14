import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-course-info-secondpage',
  templateUrl: './update-course-info-secondpage.component.html',
  styleUrls: ['./update-course-info-secondpage.component.css']
})
export class UpdateCourseInfoSecondpageComponent implements OnInit {

  hasAptitudeTest = false;
  multiForm: FormData = new FormData();
  courseStreams1: any;
  courseStreamsSpecializations1: any;
  courseStreamsSpecializations2: any;
  courseStreamsSpecializations12: any;
  universityTypeSelected;
  boardList: any;
  otherboardList: any;
  universityList;
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

  accademicLevels;
  accademicLevelsCourses;
  courseStreams;
  courseStreamsSpecializations;
  courseTypes;
  universityTypes;
  aptitudeTests;
  currentYear = new Date().getFullYear()
  currentMonth = new Date().getMonth()
  maindeskdata;
  submaindesk;
  institutionTypeList;
  institutionCategoryList;
  courserListDetails:any=[];
  stateList:any=[];
  districtList:any=[];
  ngOnInit(): void {
    // this.instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
    this.instituteId = this.authService.instituteProfile.id;
    this.loadData();
    this.maindesk();
    this.form = this.formBuilder.group({
      maleAllowed: [''],
      femaleAllowed: [''],
      otherGenderAllowed: [''],
      admissionType:['',[Validators.required]],
      campusAddressLine1: ['', [Validators.required]],
      campusAddressLine2: ['', [Validators.required]],
      campusAddressLine3: ['', [Validators.required]],
      country: ['', [Validators.required]],
      block: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      stateId:['',[Validators.required]],
      districtId:['',[Validators.required]],
      onlineClassAvailability: [false],
      aptituteTestRequired: [false],
      aptituteTestId: [0],
      onlineInterviewRequired: [false],
      regularClassOnly: [false],
      onlineClassOnly:[false],
      regularAndonlineClass:[false],
     
    });
    this.route.paramMap.subscribe(res =>{
      console.log(res['params'].id);
      this.getCourseDetailsByiD(res['params'].id);
    })
    
  }

  loadData(): void {
   
    this.apiService.doGetRequest(`state/`).subscribe((returnData: any) => {
      this.stateList = returnData.data;
      console.log(this.stateList);
    });

    this.loadAptitudeTests();

  }
  
  loadAptitudeTests(): void {
    this.apiService.doGetRequest(endPoints.Get_aptitudeTests + this.instituteId).subscribe((returnData: any) => {
      this.aptitudeTests = returnData.data;
      console.log(this.aptitudeTests);
    });
  }
  loadAccademicLevelCourses(event): void {
    const academicLevelId = event.target.value;
    // alert(academicLevelId)
    this.apiService.doGetRequest(endPoints.Get_academicLevel_Courses + academicLevelId).subscribe((returnData: any) => {
      this.accademicLevelsCourses = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadCourseStreamSpecializations(event): void {
    const streamId = event.target.value;
    // alert(academicLevelId)
    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }
  loaddistricts(event)
  {
    console.log(event.target.value);
    this.apiService.doGetRequest(`district/`+event.target.value).subscribe((returnData: any) => {
      this.districtList = returnData.data;
      console.log(this.districtList);
    });

  }
  getinsttiutetype(academicLevelId)
  {
    console.log(" herre");
    
    this.apiService.doGetRequest(`institute-type/courseCatagory/`+academicLevelId).subscribe((returnData: any) => {
      this.institutionTypeList = returnData.data;
      console.log(this.institutionTypeList);
    });
    this.apiService.doGetRequest(`institute-categories/courseCatagory/`+academicLevelId).subscribe((returnData: any) => {
      this.institutionCategoryList = returnData.data;
      console.log(this.institutionCategoryList);
    });
  }
  getCourseDetailsByiD(id)
  {
    this.apiService.doGetRequest(`institute/course/`+id).subscribe(
      data =>{
        this.courserListDetails = data['data'];
      
        this.form.controls['onlineClassAvailability'].setValue(this.courserListDetails['onlineClassAvailability'].toString());
        this.form.controls['aptituteTestRequired'].setValue(this.courserListDetails['aptituteTestRequired']);
        this.form.controls['aptituteTestId'].setValue(this.courserListDetails['aptituteTestId']);
        this.form.controls['otherGenderAllowed'].setValue(this.courserListDetails['otherGenderAllowed']);
        this.form.controls['femaleAllowed'].setValue(this.courserListDetails['femaleAllowed']);
        this.form.controls['maleAllowed'].setValue(this.courserListDetails['maleAllowed']);
        this.form.controls['admissionType'].setValue(this.courserListDetails['admissionType']);
        this.form.controls['stateId'].setValue(this.courserListDetails['stateId']);
        this.apiService.doGetRequest(`district/`+this.courserListDetails['stateId']).subscribe((returnData: any) => {
          this.districtList = returnData.data;
          console.log(this.districtList);
        });
        this.form.controls['districtId'].setValue(this.courserListDetails['districtId']);
        this.form.controls['campusAddressLine1'].setValue(this.courserListDetails['campusAddressLine1']);
        this.form.controls['campusAddressLine2'].setValue(this.courserListDetails['campusAddressLine2']);
        this.form.controls['campusAddressLine3'].setValue(this.courserListDetails['campusAddressLine3']);
        this.form.controls['country'].setValue(this.courserListDetails['country']);
        this.form.controls['block'].setValue(this.courserListDetails['block']);
        this.form.controls['locality'].setValue(this.courserListDetails['locality']);
        this.form.controls['onlineInterviewRequired'].setValue(this.courserListDetails['onlineInterviewRequired']);
        this.form.controls['regularClassOnly'].setValue(this.courserListDetails['regularClassOnly'].toString());
        this.form.controls['onlineClassOnly'].setValue(this.courserListDetails['onlineClassOnly'].toString());
        this.form.controls['regularAndonlineClass'].setValue(this.courserListDetails['regularAndonlineClass'].toString());
      },
      error =>{

      }
    )
  }
  getsubcat1Basedon1(id)
  {
    const academicLevelId = id;
    this.apiService.doGetRequest(`course-categories/subcategory/` + academicLevelId).subscribe((returnData: any) => {
      this.submaindesk = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  getsubcat1Basedon2(id)
  {
    const academicLevelId = id;
    this.apiService.doGetRequest(`course-categories/subcategory2/` + academicLevelId).subscribe((returnData: any) => {
      this.courseStreams1 = returnData.data;
      console.log(this.courseStreams1);
    });
  }
  getsubcat1Basedon3(id)
  {
    const academicLevelId = id;
    this.apiService.doGetRequest(`course-categories/subcategory3/` + academicLevelId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations12 = returnData.data;
      console.log(this.courseStreamsSpecializations12);
    });
  }
  getsubcat1Basedon4(id):void{
    const subcategoryId = id;
    this.apiService.doGetRequest(`course-categories/subcategory4/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations1 = returnData.data;
 
    });
  }
  getsubcat1Basedon5(id):void{
    const subcategoryId = id;
    this.apiService.doGetRequest(`course-categories/subcategory5/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations2 = returnData.data;
    });
  }
  getacedemicLevelId(id)
  {
    this.apiService.doGetRequest(endPoints.Get_academicLevel_Courses + id).subscribe((returnData: any) => {
      this.accademicLevelsCourses = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  subcoursestream(id)
  {
    const streamId = id;

    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }

  onRefreshAptitude(): void {
    this.loadAptitudeTests();
  }
  onChangeAptitude(): void {
    if (this.form.get('aptituteTestRequired').value) {
      this.form.get('aptituteTestId').setValidators(Validators.required);
    }
    else {
      this.form.get('aptituteTestId').clearValidators();
    }
  }
  calculateDaysFromYearAndMonth(year, month): string {
    // alert(year + month)
    // const daysCount = parseInt(year) * 365 + parseInt(month) * 30;
    const days = _.parseInt(year) * 365 + _.parseInt(month) * 30;
    // alert("days" + days + daysCount)
    return '' + days;
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
      console.log(this.form.invalid.valueOf());
      
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.multiForm.delete('accademicLevelId');
    this.multiForm.delete('courseTypeId');
    this.multiForm.delete('courseCode');
    this.multiForm.delete('accademicLevelCourseId');
    this.multiForm.delete('universityTypeId');
    this.multiForm.delete('universityName');
    this.multiForm.delete('courseStreamId');
    this.multiForm.delete('courseStreamSpecializationId');
    this.multiForm.delete('availableSeats');
    this.multiForm.delete('accademicYear');
    this.multiForm.delete('accademicYearMonth');
    // this.multiForm.delete('courseDurationInDays');
    this.multiForm.delete('courseDuration');
    this.multiForm.delete('examConducted');
    this.multiForm.delete('admissionStartDate');
    this.multiForm.delete('admissionCloseDate');
    this.multiForm.delete('classStartDate');
    this.multiForm.delete('maleAllowed');
    this.multiForm.delete('femaleAllowed');
    this.multiForm.delete('otherGenderAllowed');
    this.multiForm.delete('campusAddressLine1');
    // this.multiForm.delete('campusName');
    this.multiForm.delete('campusAddressLine2');
    this.multiForm.delete('campusAddressLine3');
    this.multiForm.delete('country');
    this.multiForm.delete('block');
    this.multiForm.delete('locality');
    this.multiForm.delete('refundPolicy');
    this.multiForm.delete('onlineClassAvailability');
    this.multiForm.delete('aptituteTestRequired');
    this.multiForm.delete('aptituteTestId');
    this.multiForm.delete('onlineInterviewRequired');

   

    this.multiForm.append('maleAllowed', formData.maleAllowed);
    this.multiForm.append('femaleAllowed', formData.femaleAllowed);
    this.multiForm.append('otherGenderAllowed', formData.otherGenderAllowed);
    this.multiForm.append('admissionType', formData.admissionType);

    this.multiForm.append('campusAddressLine1', formData.campusAddressLine1);
    this.multiForm.append('campusAddressLine2', formData.campusAddressLine2);
    this.multiForm.append('campusAddressLine3', formData.campusAddressLine3);
    this.multiForm.append('country', formData.country);
    this.multiForm.append('block', formData.block);
    this.multiForm.append('locality', formData.locality);
    this.multiForm.append('stateId', formData.stateId);
    this.multiForm.append('districtId', formData.districtId);
    this.multiForm.append('onlineClassAvailability', formData.onlineClassAvailability);
    this.multiForm.append('aptituteTestRequired', formData.aptituteTestRequired);
    this.multiForm.append('aptituteTestId', formData.aptituteTestId);
    this.multiForm.append('onlineInterviewRequired', formData.onlineInterviewRequired);
    this.multiForm.append('regularAndonlineClass', formData.regularAndonlineClass);
    
    
    this.apiService.doPostRequest_upload(`institute/course/update/` + this.courserListDetails['id'], this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Course Updated successfull');
        this.router.navigate(['/institute/courses-listed']);
      },
        error => {
          this.toastr.error(error.error[0].message);
          console.error(error);
        });


  }
  get f() { return this.form.controls; }
  maindesk(){
    this.apiService.doGetRequest(`/course-categories`).subscribe((returnData: any) => {
      this.maindeskdata = returnData.data;
      console.log("main desk levels ", this.accademicLevels);
    });
  }
  maindeksChange(event)
  {
    const academicLevelId = event.target.value;
    this.apiService.doGetRequest(`course-categories/subcategory/` + academicLevelId).subscribe((returnData: any) => {
      this.submaindesk = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  submaindeksChange(event):void
  {
    const subcategoryId = event.target.value;
    this.apiService.doGetRequest(`course-categories/subcategory2/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreams1 = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat1(event):void{
    const subcategoryId = event.target.value;
    this.apiService.doGetRequest(`course-categories/subcategory3/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations12 = returnData.data;
 
    });
  }
  loadAccademicLevelCoursessubcat2(event):void{
    const subcategoryId = event.target.value;
    this.apiService.doGetRequest(`course-categories/subcategory4/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations1 = returnData.data;
 
    });
  }
  loadAccademicLevelCoursessubcat3(event):void{
    const subcategoryId = event.target.value;
    this.apiService.doGetRequest(`course-categories/subcategory5/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations2 = returnData.data;
   
    });
  }
  subloadCourseStreamSpecializations(event){
    const streamId = event.target.value;

    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }
  changeType(event)
  {
    this.universityTypeSelected =event.target.value;
    console.log(this.universityTypeSelected);
    
    if(this.universityTypeSelected === 2)
    {
      this.apiService.doGetRequest(`boardType/`).subscribe((returnData: any) => {
        this.boardList = returnData.data;
        console.log(this.boardList);
      });
    }
    if(this.universityTypeSelected === 3)
    {
      this.apiService.doGetRequest(`otherBoardType/`).subscribe((returnData: any) => {
        this.otherboardList = returnData.data;
        console.log(this.otherboardList);
      });
    }
  }
}