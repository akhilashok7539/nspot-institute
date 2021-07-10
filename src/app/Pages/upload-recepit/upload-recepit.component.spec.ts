import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecepitComponent } from './upload-recepit.component';

describe('UploadRecepitComponent', () => {
  let component: UploadRecepitComponent;
  let fixture: ComponentFixture<UploadRecepitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRecepitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRecepitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
