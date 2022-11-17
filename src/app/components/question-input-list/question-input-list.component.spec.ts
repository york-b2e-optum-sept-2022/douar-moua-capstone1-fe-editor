import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputListComponent } from './question-input-list.component';

describe('QuestionInputListComponent', () => {
  let component: QuestionInputListComponent;
  let fixture: ComponentFixture<QuestionInputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionInputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
