import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstituteTravelinfoComponent } from './add-institute-travelinfo.component';

describe('AddInstituteTravelinfoComponent', () => {
  let component: AddInstituteTravelinfoComponent;
  let fixture: ComponentFixture<AddInstituteTravelinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstituteTravelinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstituteTravelinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
