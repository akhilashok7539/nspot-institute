import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStep4Component } from './course-step4.component';

describe('CourseStep4Component', () => {
  let component: CourseStep4Component;
  let fixture: ComponentFixture<CourseStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
