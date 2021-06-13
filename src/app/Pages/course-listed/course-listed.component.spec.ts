import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListedComponent } from './course-listed.component';

describe('CourseListedComponent', () => {
  let component: CourseListedComponent;
  let fixture: ComponentFixture<CourseListedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
