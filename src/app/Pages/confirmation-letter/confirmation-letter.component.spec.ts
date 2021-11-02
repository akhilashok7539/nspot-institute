import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationLetterComponent } from './confirmation-letter.component';

describe('ConfirmationLetterComponent', () => {
  let component: ConfirmationLetterComponent;
  let fixture: ComponentFixture<ConfirmationLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
