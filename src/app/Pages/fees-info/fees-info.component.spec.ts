import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesInfoComponent } from './fees-info.component';

describe('FeesInfoComponent', () => {
  let component: FeesInfoComponent;
  let fixture: ComponentFixture<FeesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
