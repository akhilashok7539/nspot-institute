import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudetntListComponent } from './studetnt-list.component';

describe('StudetntListComponent', () => {
  let component: StudetntListComponent;
  let fixture: ComponentFixture<StudetntListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudetntListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudetntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
