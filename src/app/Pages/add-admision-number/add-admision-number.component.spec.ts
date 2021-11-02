import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmisionNumberComponent } from './add-admision-number.component';

describe('AddAdmisionNumberComponent', () => {
  let component: AddAdmisionNumberComponent;
  let fixture: ComponentFixture<AddAdmisionNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdmisionNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdmisionNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
