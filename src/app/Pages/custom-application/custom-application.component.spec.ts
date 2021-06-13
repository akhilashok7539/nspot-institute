import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomApplicationComponent } from './custom-application.component';

describe('CustomApplicationComponent', () => {
  let component: CustomApplicationComponent;
  let fixture: ComponentFixture<CustomApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
