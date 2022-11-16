import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-survey-input',
  templateUrl: './survey-input.component.html',
  styleUrls: ['./survey-input.component.css']
})
export class SurveyInputComponent implements OnInit {

  @Output() creatingSurvey = new EventEmitter<boolean>()
  createSurvey: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  cancelCreateSurvey() {
    this.creatingSurvey.emit(this.createSurvey)
  }
}
