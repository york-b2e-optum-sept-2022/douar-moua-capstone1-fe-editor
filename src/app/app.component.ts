import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from "./services/survey.service";
import {Subscription} from "rxjs";
import {ResponseService} from "./services/response.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'douar-moua-capstone1-fe-editor';

  viewResponse:boolean = false

  viewSurvey:boolean = false
  viewSurveySub: Subscription

  creatingSurvey: boolean = false

  constructor(private surveyService: SurveyService, private responseService: ResponseService) {
    this.viewSurveySub = this.surveyService.$viewSurveyList.subscribe(
      viewSurvey => this.viewSurvey = viewSurvey
    )
  }

  ngOnInit(): void {
    this.surveyService.getSurveyList()
    this.responseService.getResponseList()
  }

  toggleViewResponseClick(viewResponse: boolean){
    this.viewResponse = viewResponse
  }

  toggleViewSurveyClick(viewSurvey: boolean) {
    this.viewSurvey = viewSurvey
  }

  toggleCreateSurveyClick() {
    this.creatingSurvey = !this.creatingSurvey
  }

  cancelCreateSurvey(cancelCreate: boolean) {
    this.creatingSurvey = cancelCreate
  }

  ngOnDestroy(): void {
    this.viewSurveySub.unsubscribe()
  }
}
