import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDownloadComponent } from './update-download.component';

describe('UpdateDownloadComponent', () => {
  let component: UpdateDownloadComponent;
  let fixture: ComponentFixture<UpdateDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
