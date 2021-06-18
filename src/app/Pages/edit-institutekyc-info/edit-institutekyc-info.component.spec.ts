import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutekycInfoComponent } from './edit-institutekyc-info.component';

describe('EditInstitutekycInfoComponent', () => {
  let component: EditInstitutekycInfoComponent;
  let fixture: ComponentFixture<EditInstitutekycInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitutekycInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutekycInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
