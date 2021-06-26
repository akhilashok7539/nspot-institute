import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoardofcouncilComponent } from './update-boardofcouncil.component';

describe('UpdateBoardofcouncilComponent', () => {
  let component: UpdateBoardofcouncilComponent;
  let fixture: ComponentFixture<UpdateBoardofcouncilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBoardofcouncilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBoardofcouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
