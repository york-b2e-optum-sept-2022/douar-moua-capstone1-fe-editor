import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {QuestionService} from "../../services/question.service";
import {SurveyService} from "../../services/survey.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {

  survey!: ISurvey;
  surveySub: Subscription;

  constructor(private questionService: QuestionService, private surveyService: SurveyService) {
    this.surveySub = surveyService.$survey.subscribe(
      survey => this.survey = <ISurvey>survey)
  }

  ngOnInit(): void {}

  onDeleteSurveyClick() {
    console.log("delete clicked!")
    this.surveyService.deleteSurveyById(this.survey.id)
  }

  ngOnDestroy(): void {
    this.surveySub.unsubscribe()
  }
}
