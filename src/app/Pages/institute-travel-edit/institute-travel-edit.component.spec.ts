import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteTravelEditComponent } from './institute-travel-edit.component';

describe('InstituteTravelEditComponent', () => {
  let component: InstituteTravelEditComponent;
  let fixture: ComponentFixture<InstituteTravelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteTravelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteTravelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
