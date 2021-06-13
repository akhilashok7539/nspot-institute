import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptitudeTestComponent } from './aptitude-test.component';

describe('AptitudeTestComponent', () => {
  let component: AptitudeTestComponent;
  let fixture: ComponentFixture<AptitudeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptitudeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptitudeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
