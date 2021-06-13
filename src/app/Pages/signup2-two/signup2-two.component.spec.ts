import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup2TwoComponent } from './signup2-two.component';

describe('Signup2TwoComponent', () => {
  let component: Signup2TwoComponent;
  let fixture: ComponentFixture<Signup2TwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup2TwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup2TwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
