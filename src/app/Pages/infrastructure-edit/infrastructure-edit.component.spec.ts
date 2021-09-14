import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureEditComponent } from './infrastructure-edit.component';

describe('InfrastructureEditComponent', () => {
  let component: InfrastructureEditComponent;
  let fixture: ComponentFixture<InfrastructureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
