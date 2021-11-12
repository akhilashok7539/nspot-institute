import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-step1',
  templateUrl: './course-step1.component.html',
  styleUrls: ['./course-step1.component.css']
})
export class CourseStep1Component implements OnInit {
  hasAptitudeTest = false;
  multiForm: FormData = new FormData();
  courseStreams1: any;
  courseStreamsSpecializations1: any;
  courseStreamsSpecializations2: any;
  courseStreamsSpecializations12: any;
  universityList: any;
  boardList: any;
  otherboardList: any;

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
  universityTypeSelected;
  accademicLevels;
  accademicLevelsCourses;
  courseStreams;
  courseStreamsSpecializations;
  institutionTypeList:any=[];
  institutionCategoryList:any=[];
  courseTypes;
  universityTypes;
  aptitudeTests;
  currentYear = new Date().getFullYear()
  currentMonth = new Date().getMonth()
  maindeskdata;
  submaindesk;
  stateList;
  districtList;
  ngOnInit(): void {
    // this.instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
    this.instituteId = this.authService.instituteProfile.id;
    this.loadData();
    this.maindesk();
    this.form = this.formBuilder.group({
      // unitOfFile: [''], // now not in forms
      // accademicLevelId: ['', [Validators.required]],
      // accademicLevelCourseId: ['', [Validators.required]],
      courseTypeId: ['', [Validators.required]],
      courseCode: ['', [Validators.required]],
      universityTypeId: ['', [Validators.required]],
      // universityName: [''],
      // courseStreamId: ['', ],
      // courseStreamSpecializationId: [''],
      availableSeats: [0, [Validators.required, Validators.min(1)]], // number validation
      accademicYear: [this.currentYear, [Validators.required, Validators.min(this.currentYear)]], // number
      accademicYearMonth: [this.currentMonth, [Validators.required]], // number
      // courseDuration_year: [0, [Validators.required, Validators.min(0)]], // number
      // courseDuration_months: [0, [Validators.required, Validators.min(0)]], // number
      courseDuration: [''],
      examConducted: ['', [Validators.required]],
      admissionStartDate: ['', [Validators.required]],
      admissionCloseDate: ['', [Validators.required]],
      classStartDate: ['', [Validators.required]],
      maleAllowed: [false],
      femaleAllowed: [false],
      otherGenderAllowed: [false],
      // campusName: ['', [Validators.required]],
      campusAddressLine1: ['', [Validators.required]],
      campusAddressLine2: ['', [Validators.required]],
      campusAddressLine3: ['', [Validators.required]],
      country: ['', [Validators.required]],
      block: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      refundPolicy: [''],
      onlineClassAvailability: ['false', [Validators.required]],
      aptituteTestRequired: [false],
      aptituteTestId: [0],
      onlineInterviewRequired: [false],
      regularClassOnly: [false],
      onlineClassOnly:[false],
      regularAndonlineClass:[false],
      courseSyllabusFile: ['', [Validators.required]],
      CourseCategoryId: [''],
      CourseSubCategoryId: [''],
      // courseTypeId: [''],
      CourseSubCategory2Id: [''],
      CourseSubCategory3Id: [''],
      CourseSubCategory4Id: [''],
      CourseSubCategory5Id: [''],
      programCode :[''],
      stateId:['',[Validators.required]],
      districtId:['',[Validators.required]],
      instituteType:['',[Validators.required]],
      instituteCatagory:['',[Validators.required]],
      year:['',[Validators.required]],
      month:['',[Validators.required]],
      day:['',[Validators.required]],
      hour:['',[Validators.required]],
      universityId:[''],
      admissionType:['',[Validators.required]],
      boardId:[''],
      otherId:[''],
    });
  }

  loadData(): void {
    this.apiService.doGetRequest(endPoints.Get_academicLevels).subscribe((returnData: any) => {
      this.accademicLevels = returnData.data;
      console.log(this.accademicLevels);
    });
    this.apiService.doGetRequest(endPoints.Get_courseTypes).subscribe((returnData: any) => {
      this.courseTypes = returnData.data;
      console.log(this.courseTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_universityTypes).subscribe((returnData: any) => {
      this.universityTypes = returnData.data;
      console.log(this.universityTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_courseStream).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log(this.universityTypes);
    });
    this.apiService.doGetRequest(`state/`).subscribe((returnData: any) => {
      this.stateList = returnData.data;
      console.log(this.stateList);
    });
    this.apiService.doGetRequest(`university`).subscribe((returnData: any) => {
      this.universityList = returnData.data;
      console.log(this.universityList);
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
  changeType(event)
  {
    this.universityTypeSelected =event.target.value;
    console.log(this.universityTypeSelected);
    
    if(this.universityTypeSelected === '2')
    {
      this.apiService.doGetRequest(`boardType/`).subscribe((returnData: any) => {
        this.boardList = returnData.data;
        console.log(this.boardList);
      });
    }
    if(this.universityTypeSelected === '3')
    {
      this.apiService.doGetRequest(`otherBoardType/`).subscribe((returnData: any) => {
        this.otherboardList = returnData.data;
        console.log(this.otherboardList);
      });
    }
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
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    // this.multiForm.delete('accademicLevelId');
    // this.multiForm.delete('courseTypeId');
    // this.multiForm.delete('courseCode');
    // this.multiForm.delete('accademicLevelCourseId');
    // this.multiForm.delete('universityTypeId');
    // this.multiForm.delete('universityName');
    // this.multiForm.delete('courseStreamId');
    // this.multiForm.delete('courseStreamSpecializationId');
    // this.multiForm.delete('availableSeats');
    // this.multiForm.delete('accademicYear');
    // this.multiForm.delete('accademicYearMonth');
    // // this.multiForm.delete('courseDurationInDays');
    // this.multiForm.delete('courseDuration');
    // this.multiForm.delete('examConducted');
    // this.multiForm.delete('admissionStartDate');
    // this.multiForm.delete('admissionCloseDate');
    // this.multiForm.delete('classStartDate');
    // this.multiForm.delete('maleAllowed');
    // this.multiForm.delete('femaleAllowed');
    // this.multiForm.delete('otherGenderAllowed');
    // this.multiForm.delete('campusAddressLine1');
    // this.multiForm.delete('campusName');
    // this.multiForm.delete('campusAddressLine2');
    // this.multiForm.delete('campusAddressLine3');
    // this.multiForm.delete('country');
    // this.multiForm.delete('block');
    // this.multiForm.delete('locality');
    // this.multiForm.delete('refundPolicy');
    // this.multiForm.delete('onlineClassAvailability');
    // this.multiForm.delete('aptituteTestRequired');
    // this.multiForm.delete('aptituteTestId');
    // this.multiForm.delete('onlineInterviewRequired');
    
    // this.multiForm.append('accademicLevelId', formData.accademicLevelId);
    this.multiForm.append('courseTypeId', formData.courseTypeId);
    this.multiForm.append('courseCode', formData.courseCode);
    // this.multiForm.append('accademicLevelCourseId', formData.accademicLevelCourseId); 
    this.multiForm.append('universityTypeId', formData.universityTypeId);
    this.multiForm.append('universityId', formData.universityId);
    // this.multiForm.append('courseStreamId', formData.courseStreamId);
    // this.multiForm.append('courseStreamSpecializationId', formData.courseStreamSpecializationId);
    this.multiForm.append('availableSeats', formData.availableSeats);
    this.multiForm.append('accademicYear', formData.accademicYear);
    this.multiForm.append('accademicYearMonth', formData.accademicYearMonth);
    this.multiForm.append('courseDuration', formData.hour + formData.day + formData.month + formData.year);
    this.multiForm.append('examConducted', formData.examConducted);
    this.multiForm.append('admissionStartDate', formData.admissionStartDate);
    this.multiForm.append('admissionCloseDate', formData.admissionCloseDate);
    this.multiForm.append('classStartDate', formData.classStartDate);
    this.multiForm.append('maleAllowed', formData.maleAllowed);
    this.multiForm.append('femaleAllowed', formData.femaleAllowed);
    this.multiForm.append('otherGenderAllowed', formData.otherGenderAllowed);
    this.multiForm.append('campusAddressLine1', formData.campusAddressLine1);
    this.multiForm.append('campusAddressLine2', formData.campusAddressLine2);
    this.multiForm.append('campusAddressLine3', formData.campusAddressLine3);
    this.multiForm.append('country', formData.country);
    this.multiForm.append('block', formData.block);
    this.multiForm.append('locality', formData.locality);
    this.multiForm.append('refundPolicy', formData.refundPolicy);
    this.multiForm.append('onlineClassAvailability', formData.onlineClassAvailability);
    this.multiForm.append('aptituteTestRequired', formData.aptituteTestRequired);
    this.multiForm.append('aptituteTestId', formData.aptituteTestId);
    this.multiForm.append('onlineInterviewRequired', formData.onlineInterviewRequired);
    this.multiForm.append('CourseCategoryId',formData.CourseCategoryId)
    this.multiForm.append('year',formData.year)
    this.multiForm.append('day',formData.day)
    this.multiForm.append('month',formData.month)
    this.multiForm.append('hour',formData.hour)
    this.multiForm.append('admissionType',formData.admissionType)
    this.multiForm.append('regularAndonlineClass',formData.regularAndonlineClass)
    this.multiForm.append('onlineClassOnly',formData.onlineClassOnly)
    this.multiForm.append('regularClassOnly',formData.regularClassOnly)
    this.multiForm.append('programCode',formData.programCode)
    this.multiForm.append('instituteCatagory',formData.instituteCatagory)
    this.multiForm.append('instituteType',formData.instituteType)

    this.multiForm.append('stateId',formData.stateId)
    this.multiForm.append('districtId',formData.districtId)

    if(formData.CourseSubCategoryId === "")
    {
      // this.multiForm.append('CourseSubCategoryId',null)
    }
    else{
      this.multiForm.append('CourseSubCategoryId',formData.CourseSubCategoryId)
    }
  
    if(formData.CourseSubCategory2Id === "")
    {
      // this.multiForm.append('CourseSubCategory2Id',null)
    }
    else{
      this.multiForm.append('CourseSubCategory2Id',formData.CourseSubCategory2Id)
    }
    
    if(formData.CourseSubCategory3Id === "")
    {
      // this.multiForm.append('CourseSubCategory3Id',null)
    }
    else{
      this.multiForm.append('CourseSubCategory3Id',formData.CourseSubCategory3Id)
    }
    if(formData.CourseSubCategory4Id === "")
    {
      // this.multiForm.append('CourseSubCategory4Id',null)
    }
    else{
      this.multiForm.append('CourseSubCategory4Id',formData.CourseSubCategory4Id)
    }
   
    if(formData.CourseSubCategory5Id === "")
    {
      // this.multiForm.append('CourseSubCategory5Id',null)
    }
    else{
      this.multiForm.append('CourseSubCategory5Id',formData.CourseSubCategory5Id)
    }
    
    sessionStorage.setItem("courseDuration",JSON.stringify(formData.hour +' Hours-'+ formData.day +'-'+ formData.month +'-'+ formData.year))

    this.apiService.doPostRequest_upload(endPoints.Create_course + this.instituteId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Form submission successfull');
        this.router.navigate(['/institute/post/course/step-2/' + returnData.data.id]);
      },
        error => {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('enabled', '');

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
    this.apiService.doGetRequest(`institute-type/courseCatagory/`+academicLevelId).subscribe((returnData: any) => {
      this.institutionTypeList = returnData.data;
      console.log(this.institutionTypeList);
    });
    this.apiService.doGetRequest(`institute-categories/courseCatagory/`+academicLevelId).subscribe((returnData: any) => {
      this.institutionCategoryList = returnData.data;
      console.log(this.institutionCategoryList);
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
}
