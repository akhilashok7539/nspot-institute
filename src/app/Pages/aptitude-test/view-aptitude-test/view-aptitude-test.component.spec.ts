import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAptitudeTestComponent } from './view-aptitude-test.component';

describe('ViewAptitudeTestComponent', () => {
  let component: ViewAptitudeTestComponent;
  let fixture: ComponentFixture<ViewAptitudeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAptitudeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAptitudeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
