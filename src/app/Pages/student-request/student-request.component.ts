import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-request',
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.css'],
})
export class StudentRequestComponent implements OnInit {
  academicLevel = 0;
  course = 0;
  empty = true;
  constructor() {}

  ngOnInit(): void {}
  changeAcademicLevel() {
    this.course = 0;
    if (this.course == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  changeCourse() {
    if (this.course == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }
}
