import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-survey-input',
  templateUrl: './survey-input.component.html',
  styleUrls: ['./survey-input.component.css']
})
export class SurveyInputComponent implements OnInit {

  @Output() creatingSurvey = new EventEmitter<boolean>()
  createSurvey: boolean = false

  newSurvey: ISurvey = {
    id: 0,
    title: ""
  }

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
  }

  cancelCreateSurveyClick() {
    this.creatingSurvey.emit(this.createSurvey)
  }

  onCreateSurveyClick(){
    if (this.newSurvey.title == ""){
      alert("Please give survey a title!")
      return;
    }
    console.log(this.newSurvey)
    this.surveyService.createNewSurvey(this.newSurvey)
  }
}
