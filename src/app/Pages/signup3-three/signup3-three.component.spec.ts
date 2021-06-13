import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup3ThreeComponent } from './signup3-three.component';

describe('Signup3ThreeComponent', () => {
  let component: Signup3ThreeComponent;
  let fixture: ComponentFixture<Signup3ThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup3ThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup3ThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
