import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyInputComponent } from './survey-input.component';

describe('SurveyInputComponent', () => {
  let component: SurveyInputComponent;
  let fixture: ComponentFixture<SurveyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
