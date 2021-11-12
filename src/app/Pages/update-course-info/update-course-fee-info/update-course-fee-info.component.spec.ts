import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseFeeInfoComponent } from './update-course-fee-info.component';

describe('UpdateCourseFeeInfoComponent', () => {
  let component: UpdateCourseFeeInfoComponent;
  let fixture: ComponentFixture<UpdateCourseFeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCourseFeeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseFeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
