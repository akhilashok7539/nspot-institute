import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionOfficersComponent } from './admission-officers.component';

describe('AdmissionOfficersComponent', () => {
  let component: AdmissionOfficersComponent;
  let fixture: ComponentFixture<AdmissionOfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionOfficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
