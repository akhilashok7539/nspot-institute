import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aptitude-test',
  templateUrl: './aptitude-test.component.html',
  styleUrls: ['./aptitude-test.component.css']
})
export class AptitudeTestComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  formTest: FormGroup;
  formQuestion: FormGroup;
  touchedFormTest = false;
  touchedFormQuestion = false;
  selectedTestId;
  tests;
  questions;
  // multiForm: FormData = new FormData();
  instituteId = this.authService.instituteProfile.id;
  baseApiUrl = environment.baseApiUrl;

  ngOnInit(): void {
    this.loadTests();
    this.formTest = this.formBuilder.group({
      title: ['', [Validators.required]],
      durationInMinuts: ['', [Validators.required]],
    });

    this.formQuestion = this.formBuilder.group({
      // questionNo: ['', [Validators.required]],
      question: ['', [Validators.required]],
      // mark: ['', [Validators.required]],

      option1: ['', [Validators.required]], // while sending {questionId,option,isCorrectOption}
      option2: ['', [Validators.required]], // while sending {questionId,option,isCorrectOption}
      option3: ['', [Validators.required]], // while sending {questionId,option,isCorrectOption}
      option4: ['', [Validators.required]], // while sending {questionId,option,isCorrectOption}
      correctOption: ['', [Validators.required]],
    });
  }

  // loading test data
  loadTests(): void {
    this.apiService.doGetRequest(endPoints.Get_aptitudeTests + this.instituteId).subscribe((returnData: any) => {
      this.tests = returnData.data;
      console.log(this.tests);
    });
  }

  // loading questions data
  loadQuestions(): void {
    this.questions = null;
    this.apiService.doGetRequest(
      endPoints.Get_aptitudeTests_questions + this.selectedTestId + '/questions'
    ).subscribe((returnData: any) => {
      this.questions = returnData.data;
      console.log(this.questions);
    });
  }

  onSelectingTest(testId): void {
    this.selectedTestId = testId;
    this.loadQuestions();
    this.formQuestion.reset();
  }

  onSubmitTest(): void {
    this.touchedFormTest = true;
    if (this.formTest.invalid) {
      return;
    } else {
      const formData = this.formTest.value;
      (document.querySelector('#submit-btn-test') as HTMLInputElement).setAttribute('disabled', '');

      this.apiService.doPostRequest(
        endPoints.Create_aptitudeTest + this.instituteId,
        formData)
        .subscribe((returnData: any) => {
          if (returnData.status == true) {
            this.toastr.success('Test added successfully');
            (document.querySelector('#submit-btn-test') as HTMLInputElement).removeAttribute('disabled');
            this.formTest.reset();
            this.loadTests();
          }
          else {
            this.toastr.error(returnData.error.message);
            (document.querySelector('#submit-btn-test') as HTMLInputElement).removeAttribute('disabled');
            this.formTest.reset();
            this.loadTests();
          }

        },
          error => {
            console.error(error);
            const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
            this.toastr.success(message);
            (document.querySelector('#submit-btn-test') as HTMLInputElement).removeAttribute('disabled');
            this.formTest.reset();
          });

    }

  }

  onSubmitQuestion(): void {
    this.touchedFormQuestion = true;
    if (this.formQuestion.invalid) {
      return;
    } else {
      const formData = this.formQuestion.value;
      (document.querySelector('#submit-btn-question') as HTMLInputElement).setAttribute('disabled', '');

      this.apiService.doPostRequest(
        endPoints.Create_aptitudeQuestion + this.selectedTestId + '/create',
        formData)
        .subscribe((returnData: any) => {
          if (returnData.status == true) {
            this.toastr.success('Question added successfully');
            (document.querySelector('#submit-btn-question') as HTMLInputElement).removeAttribute('disabled');
            this.formQuestion.reset();
            this.loadQuestions();
          }
          else {
            this.toastr.error(returnData.error.message);
            (document.querySelector('#submit-btn-question') as HTMLInputElement).removeAttribute('disabled');
            this.formQuestion.reset();
            this.loadQuestions();
          }

        },
          error => {
            console.error(error);
            const message = error.error ? error.error[0].message : 'Something went wrong please try again later.';
            this.toastr.success(message);
            (document.querySelector('#submit-btn-test') as HTMLInputElement).removeAttribute('disabled');
            this.formQuestion.reset();
          });

    }

  }

  get f() { return this.formTest.controls; }
  get q() { return this.formQuestion.controls; }
}
