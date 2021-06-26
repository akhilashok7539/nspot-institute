import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVirtualTourComponent } from './update-virtual-tour.component';

describe('UpdateVirtualTourComponent', () => {
  let component: UpdateVirtualTourComponent;
  let fixture: ComponentFixture<UpdateVirtualTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVirtualTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVirtualTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
