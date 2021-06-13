import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionDeskComponent } from './admission-desk.component';

describe('AdmissionDeskComponent', () => {
  let component: AdmissionDeskComponent;
  let fixture: ComponentFixture<AdmissionDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
