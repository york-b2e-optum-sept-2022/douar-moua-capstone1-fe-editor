import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {ISurvey} from "../../_Interfaces/ISurvey";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  surveyList: ISurvey[] = []
  surveyListSub: Subscription

  @Output() viewSurvey = new EventEmitter<boolean>()
  viewSurveyClick: boolean = false

  constructor(private surveyService: SurveyService, private questionService: QuestionService) {
    this.surveyListSub = this.surveyService.$surveyList.subscribe(
      surveyList => {this.surveyList = surveyList}
    )
  }

  ngOnInit(): void {
    this.surveyService.getSurveyList()
  }

  onViewSurveyClick(surveyId: number){
    this.surveyService.getSurveyById(surveyId)
    this.questionService.getSurveyQuestionList(<number>surveyId)
    this.viewSurvey.emit(!this.viewSurveyClick)
  }

  ngOnDestroy(): void {
    this.surveyListSub.unsubscribe();
  }

}
