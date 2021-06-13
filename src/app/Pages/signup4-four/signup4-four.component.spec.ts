import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup4FourComponent } from './signup4-four.component';

describe('Signup4FourComponent', () => {
  let component: Signup4FourComponent;
  let fixture: ComponentFixture<Signup4FourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup4FourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup4FourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
