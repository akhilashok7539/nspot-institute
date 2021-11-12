import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseInfoSecondpageComponent } from './update-course-info-secondpage.component';

describe('UpdateCourseInfoSecondpageComponent', () => {
  let component: UpdateCourseInfoSecondpageComponent;
  let fixture: ComponentFixture<UpdateCourseInfoSecondpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCourseInfoSecondpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseInfoSecondpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
