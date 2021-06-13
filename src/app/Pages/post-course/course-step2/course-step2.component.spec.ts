import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStep2Component } from './course-step2.component';

describe('CourseStep2Component', () => {
  let component: CourseStep2Component;
  let fixture: ComponentFixture<CourseStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
