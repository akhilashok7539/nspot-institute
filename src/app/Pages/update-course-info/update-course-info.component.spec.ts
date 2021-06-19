import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseInfoComponent } from './update-course-info.component';

describe('UpdateCourseInfoComponent', () => {
  let component: UpdateCourseInfoComponent;
  let fixture: ComponentFixture<UpdateCourseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCourseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
