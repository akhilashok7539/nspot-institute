import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFieldsFormComponent } from './additional-fields-form.component';

describe('AdditionalFieldsFormComponent', () => {
  let component: AdditionalFieldsFormComponent;
  let fixture: ComponentFixture<AdditionalFieldsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalFieldsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalFieldsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
