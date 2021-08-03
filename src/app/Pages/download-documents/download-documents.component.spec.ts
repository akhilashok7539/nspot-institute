import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDocumentsComponent } from './download-documents.component';

describe('DownloadDocumentsComponent', () => {
  let component: DownloadDocumentsComponent;
  let fixture: ComponentFixture<DownloadDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
