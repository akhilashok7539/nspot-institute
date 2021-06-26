import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHostelinfoComponent } from './update-hostelinfo.component';

describe('UpdateHostelinfoComponent', () => {
  let component: UpdateHostelinfoComponent;
  let fixture: ComponentFixture<UpdateHostelinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHostelinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHostelinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
