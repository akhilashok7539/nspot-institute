import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStep3Component } from './course-step3.component';

describe('CourseStep3Component', () => {
  let component: CourseStep3Component;
  let fixture: ComponentFixture<CourseStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
