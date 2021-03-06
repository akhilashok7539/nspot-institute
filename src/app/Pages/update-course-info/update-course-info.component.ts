import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-course-info',
  templateUrl: './update-course-info.component.html',
  styleUrls: ['./update-course-info.component.css']
})
export class UpdateCourseInfoComponent implements OnInit {

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
  ngOnInit(): void {
    // this.instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
    this.instituteId = this.authService.instituteProfile.id;
    this.loadData();
    this.maindesk();
    this.form = this.formBuilder.group({
 
      courseTypeId: ['', ],
      courseCode: [''],
      universityTypeId: ['', ],
     
      availableSeats: [0, [Validators.required, Validators.min(1)]], // number validation
      accademicYear: [this.currentYear, ], // number
      accademicYearMonth: [this.currentMonth, ], // number
      // courseDuration_year: [0, [Validators.required, Validators.min(0)]], // number
      // courseDuration_months: [0, [Validators.required, Validators.min(0)]], // number
      courseDuration: [''],
      examConducted: ['', ],
      admissionStartDate: ['', ],
      admissionCloseDate: ['', ],
      classStartDate: ['', ],
      maleAllowed: [false],
      femaleAllowed: [false],
      otherGenderAllowed: [false],
      // campusName: ['', ],
      campusAddressLine1: ['', ],
      campusAddressLine2: ['', ],
      campusAddressLine3: ['', ],
      country: ['', ],
      block: ['', ],
      locality: ['', ],
      refundPolicy: [''],
      onlineClassAvailability: ['false', ],
      aptituteTestRequired: [false],
      aptituteTestId: [0],
      onlineInterviewRequired: [false],
      regularClassOnly: [false],
      onlineClassOnly:[false],
      regularAndonlineClass:[false],
      courseSyllabusFile: ['',],
      CourseCategoryId: [''],
      CourseSubCategoryId: [''],
      // courseTypeId: [''],
      CourseSubCategory2Id: [''],
      CourseSubCategory3Id: [''],
      CourseSubCategory4Id: [''],
      CourseSubCategory5Id: [''],
      programCode :[''],
      stateId:[''],
      districtId:[''],
      instituteType:['',],
      instituteCatagory:['',],
      year:['',],
      month:['',],
      day:['',],
      hour:['',],
      universityId:[''],
      admissionType:['',],
      boardId:[''],
      otherId:[''],
    });
    this.route.paramMap.subscribe(res =>{
      console.log(res['params'].id);
      this.getCourseDetailsByiD(res['params'].id);
    })

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
        // set main desk
        this.form.controls['CourseCategoryId'].setValue(this.courserListDetails['CourseCategory'].id);

        // get cooresponding based on main desk
        this.getsubcat1Basedon1(this.courserListDetails['CourseCategory'].id);

        //get insttute type based on maindesk
        this.getinsttiutetype(this.courserListDetails['CourseCategory'].id);

        // set 2 coresspondingdesk
        this.form.controls['CourseSubCategoryId'].setValue(this.courserListDetails['Course_Sub_Category'].id);
        this.getsubcat1Basedon2(this.courserListDetails['Course_Sub_Category'].id);

        this.form.controls['CourseSubCategory2Id'].setValue(this.courserListDetails['Course_Sub_Categories2'].id);
        this.getsubcat1Basedon3(this.courserListDetails['Course_Sub_Categories2'].id);
       
        this.form.controls['CourseSubCategory3Id'].setValue(this.courserListDetails['Course_Sub_Categories3'].id);
        this.getsubcat1Basedon4(this.courserListDetails['Course_Sub_Categories3'].id);
        if(this.courserListDetails['Course_Sub_Categories4'] != null)
        {
          this.form.controls['CourseSubCategory4Id'].setValue(this.courserListDetails['Course_Sub_Categories4'].id);
        }
     
        this.getsubcat1Basedon5(this.courserListDetails['Course_Sub_Categories4']?.id);

        if(this.courserListDetails['Course_Sub_Categories5'] != null)
        {
          this.form.controls['CourseSubCategory5Id'].setValue(this.courserListDetails['Course_Sub_Categories5'].id);
        }
      
        // this.form.controls['accademicLevelId'].setValue(this.courserListDetails['accademicLevelId']);
        // this.getacedemicLevelId(this.courserListDetails['accademicLevelId']);
        // this.form.controls['accademicLevelCourseId'].setValue(this.courserListDetails['accademicLevelCourseId']);
        this.form.controls['onlineClassAvailability'].setValue(this.courserListDetails['onlineClassAvailability']);
        this.form.controls['aptituteTestRequired'].setValue(this.courserListDetails['aptituteTestRequired']);
        this.form.controls['aptituteTestId'].setValue(this.courserListDetails['aptituteTestId']);
    
        this.form.controls['courseTypeId'].setValue(this.courserListDetails['courseTypeId']);
        this.form.controls['courseCode'].setValue(this.courserListDetails['courseCode']);
        this.form.controls['programCode'].setValue(this.courserListDetails['programCode']);

        this.form.controls['instituteType'].setValue(this.courserListDetails['instituteType']);
        this.form.controls['instituteCatagory'].setValue(this.courserListDetails['instituteCatagory']);
        
        this.form.controls['universityTypeId'].setValue(this.courserListDetails['universityTypeId']);
        if(this.courserListDetails['universityTypeId'] === 1)
        {
          this.universityTypeSelected = "1";
          this.apiService.doGetRequest(`university`).subscribe((returnData: any) => {
            this.universityList = returnData.data;
            console.log(this.universityList);
          });
        }
        if(this.courserListDetails['universityTypeId'] === 2)
        {
          this.universityTypeSelected = "2";

          this.apiService.doGetRequest(`boardType/`).subscribe((returnData: any) => {
            this.boardList = returnData.data;
            console.log(this.boardList);
          });
        }
        if(this.courserListDetails['universityTypeId'] === 3)
        {
          this.universityTypeSelected = "3";

          this.apiService.doGetRequest(`otherBoardType/`).subscribe((returnData: any) => {
            this.otherboardList = returnData.data;
            console.log(this.otherboardList);
          });
        }
        this.form.controls['universityId'].setValue(this.courserListDetails['University'].id);
        this.form.controls['year'].setValue(this.courserListDetails['year']);
        this.form.controls['month'].setValue(this.courserListDetails['month']);
        
        this.form.controls['day'].setValue(this.courserListDetails['day']);
        this.form.controls['hour'].setValue(this.courserListDetails['hour']);

        
        // this.form.controls['universityName'].setValue(this.courserListDetails['universityName']);
        // this.form.controls['courseStreamId'].setValue(this.courserListDetails['courseStreamId']);
        // this.subcoursestream(this.courserListDetails['courseStreamId']);
        // this.form.controls['courseStreamSpecializationId'].setValue(this.courserListDetails['courseStreamSpecializationId']);
        this.form.controls['courseDuration'].setValue(this.courserListDetails['courseDuration']);
        this.form.controls['availableSeats'].setValue(this.courserListDetails['availableSeats']);
        this.form.controls['accademicYear'].setValue(this.courserListDetails['accademicYear']);
        this.form.controls['accademicYearMonth'].setValue(this.courserListDetails['accademicYearMonth']);
        this.form.controls['examConducted'].setValue(this.courserListDetails['examConducted']);
        this.form.controls['admissionStartDate'].setValue(this.courserListDetails['admissionStartDate'].split("T")[0]);
        this.form.controls['admissionCloseDate'].setValue(this.courserListDetails['admissionCloseDate'].split("T")[0]);
        this.form.controls['classStartDate'].setValue(this.courserListDetails['classStartDate'].split("T")[0]);
        console.log(this.courserListDetails['admissionCloseDate'].split("T"));
        this.form.controls['campusAddressLine1'].setValue(this.courserListDetails['campusAddressLine1']);
        this.form.controls['campusAddressLine2'].setValue(this.courserListDetails['campusAddressLine2']);
        this.form.controls['campusAddressLine3'].setValue(this.courserListDetails['campusAddressLine3']);
        this.form.controls['country'].setValue(this.courserListDetails['country']);
        this.form.controls['refundPolicy'].setValue(this.courserListDetails['refundPolicy']);
        this.form.controls['block'].setValue(this.courserListDetails['block']);
        this.form.controls['locality'].setValue(this.courserListDetails['locality']);
        
        this.form.controls['stateId'].setValue(this.courserListDetails['State'].id);
        this.form.controls['districtId'].setValue(this.courserListDetails['District'].id);
        this.form.controls['admissionType'].setValue(this.courserListDetails['admissionType']);
        
  
        
        
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
    this.form.get('programCode').clearValidators();
    this.form.get('courseCode').clearValidators();
    if (this.form.invalid) {
      let invalid = [];
      console.log(this.form.invalid.valueOf());
      const controls = this.form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log(invalid);
      return;
    } else {
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
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

    // this.multiForm.append('accademicLevelId', formData.accademicLevelId);
    this.multiForm.append('courseTypeId', formData.courseTypeId);
    this.multiForm.append('courseCode', formData.courseCode);
    // this.multiForm.append('accademicLevelCourseId', formData.accademicLevelCourseId);
    this.multiForm.append('universityTypeId', formData.universityTypeId);
    // this.multiForm.append('universityName', formData.universityName);
    // this.multiForm.append('courseStreamId', formData.courseStreamId);
    // this.multiForm.append('courseStreamSpecializationId', formData.courseStreamSpecializationId);
    this.multiForm.append('availableSeats', formData.availableSeats);
    this.multiForm.append('accademicYear', formData.accademicYear);
    this.multiForm.append('accademicYearMonth', formData.accademicYearMonth);
    // this.multiForm.append('courseDurationInDays', this.calculateDaysFromYearAndMonth(
    //   formData.courseDuration_year, formData.courseDuration_months));
    // this.multiForm.append('courseDuration', formData.examConducted);
    this.multiForm.append('examConducted', formData.examConducted);
    this.multiForm.append('admissionStartDate', formData.admissionStartDate);
    this.multiForm.append('admissionCloseDate', formData.admissionCloseDate);
    this.multiForm.append('classStartDate', formData.classStartDate);
    this.multiForm.append('maleAllowed', formData.maleAllowed);
    this.multiForm.append('femaleAllowed', formData.femaleAllowed);
    this.multiForm.append('otherGenderAllowed', formData.otherGenderAllowed);
    // this.multiForm.append('campusName', formData.campusName);
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
    this.multiForm.append('CourseSubCategoryId',formData.CourseSubCategoryId)
    this.multiForm.append('CourseSubCategory2Id',formData.CourseSubCategory2Id)
    this.multiForm.append('CourseSubCategory3Id',formData.CourseSubCategory3Id)
    this.multiForm.append('CourseSubCategory4Id',formData.CourseSubCategory4Id)
    this.multiForm.append('CourseSubCategory5Id',formData.CourseSubCategory5Id)
    this.multiForm.append('year',formData.year)
    this.multiForm.append('day',formData.day)
    this.multiForm.append('month',formData.month)
    this.multiForm.append('hour',formData.hour)
    if(formData.hour === '' || formData.hour === '--')
    {
      this.multiForm.append('courseDuration',formData.year+' - '+ formData.month +' - ' + formData.day  );

    }
    else{
      this.multiForm.append('courseDuration',formData.year+' - '+ formData.month +' - ' + formData.day +' - '+ formData.hour +' Hours' );

    }

    if(formData.CourseSubCategory5Id === "")
    {
    this.multiForm.delete('CourseSubCategory5Id')

    }
    if(formData.CourseSubCategory4Id === "")
    {
    this.multiForm.delete('CourseSubCategory4Id')

    }
    console.log(typeof(this.form.value['courseDuration']))
    this.apiService.doPostRequest_upload(`institute/course/update/` + this.courserListDetails['id'], this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Course Updated successfull');
        this.router.navigate(['/institute/courses-listed']);
      },
        error => {
          console.error(error.error[0]);
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