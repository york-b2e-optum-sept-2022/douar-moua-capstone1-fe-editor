import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {QuestionService} from "../../services/question.service";
import {SurveyService} from "../../services/survey.service";
import {Subscription} from "rxjs";
import {IQuestion} from "../../_Interfaces/IQuestion";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {

  survey!: ISurvey;
  surveySub: Subscription;

  newQuestion: IQuestion = {
    prompt: "",
    responseType: "",
    surveyOwner: this.survey,
  }
  booleanResponse: String = "booleanResponse"
  multiResponse: String = "multiResponse"
  textResponse: String = "textResponse"

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

  addNewQuestionToSurveyClick() {
    console.log(this.survey)

    this.newQuestion.surveyOwner = this.survey
    console.log(this.newQuestion)

    this.questionService.addNewQuestion(this.newQuestion)
  }
}
