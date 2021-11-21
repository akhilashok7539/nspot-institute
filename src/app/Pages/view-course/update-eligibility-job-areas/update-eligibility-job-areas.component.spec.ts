import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEligibilityJobAreasComponent } from './update-eligibility-job-areas.component';

describe('UpdateEligibilityJobAreasComponent', () => {
  let component: UpdateEligibilityJobAreasComponent;
  let fixture: ComponentFixture<UpdateEligibilityJobAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEligibilityJobAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEligibilityJobAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
