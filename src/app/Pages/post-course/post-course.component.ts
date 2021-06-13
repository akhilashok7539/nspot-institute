import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-course',
  templateUrl: './post-course.component.html',
  styleUrls: ['./post-course.component.css'],
})
export class PostCourseComponent implements OnInit {
  tabBody: boolean[] = [true, false, false, false];
  tabsValidated: boolean[] = [false, false, false, false];

  hasAptitudeTest = false;
  hasScolarshipBenefits = false;
  hasPlacement = false;

  constructor() {}

  ngOnInit(): void {}

  changeTab(tabid) {
    // tslint:disable-next-line: forin
    for (let i in this.tabBody) {
      this.tabBody[tabid] = true;
      if (i < tabid) {
        this.tabsValidated[i] = true;
      }
      if (tabid != i) {
        this.tabBody[i] = false;
      }
    }
    window.scroll(0, 0);
  }
}
