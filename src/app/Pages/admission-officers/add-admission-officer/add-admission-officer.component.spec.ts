import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmissionOfficerComponent } from './add-admission-officer.component';

describe('AddAdmissionOfficerComponent', () => {
  let component: AddAdmissionOfficerComponent;
  let fixture: ComponentFixture<AddAdmissionOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdmissionOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdmissionOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
