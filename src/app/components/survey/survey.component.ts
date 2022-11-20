import {Component, OnDestroy, OnInit} from '@angular/core';
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

  isEditingSurvey: boolean = false

  constructor(private questionService: QuestionService, private surveyService: SurveyService) {
    this.surveySub = surveyService.$survey.subscribe(
      survey => this.survey = <ISurvey>survey)
  }

  ngOnInit(): void {}

  onDeleteSurveyClick() {
    this.surveyService.deleteSurveyById(this.survey.id)
  }

  ngOnDestroy(): void {
    this.surveySub.unsubscribe()
  }

  onEditSurveyClick() {
    this.isEditingSurvey = !this.isEditingSurvey
    this.surveyService.toggleEditSurvey()

  }

  onSaveSurveyEditClick(){
    console.log(this.survey)
    this.surveyService.saveEditSurvey(this.survey)
    this.onEditSurveyClick()
  }

  onCancelEditClick() {
    this.isEditingSurvey = !this.isEditingSurvey
    this.surveyService.toggleEditSurveyCancel()
  }
}
