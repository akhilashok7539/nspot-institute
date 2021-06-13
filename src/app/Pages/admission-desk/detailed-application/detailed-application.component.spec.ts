import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedApplicationComponent } from './detailed-application.component';

describe('DetailedApplicationComponent', () => {
  let component: DetailedApplicationComponent;
  let fixture: ComponentFixture<DetailedApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
