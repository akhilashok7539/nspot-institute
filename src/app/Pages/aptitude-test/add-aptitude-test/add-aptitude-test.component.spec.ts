import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAptitudeTestComponent } from './add-aptitude-test.component';

describe('AddAptitudeTestComponent', () => {
  let component: AddAptitudeTestComponent;
  let fixture: ComponentFixture<AddAptitudeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAptitudeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAptitudeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
