import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedStudnetListComponent } from './completed-studnet-list.component';

describe('CompletedStudnetListComponent', () => {
  let component: CompletedStudnetListComponent;
  let fixture: ComponentFixture<CompletedStudnetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedStudnetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedStudnetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
