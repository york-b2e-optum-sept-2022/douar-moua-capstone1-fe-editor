import { Component } from '@angular/core';
import {SurveyService} from "./services/survey.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'douar-moua-capstone1-fe-editor';

  viewSurvey:boolean = false
  viewSurveySub: Subscription

  creatingSurvey: boolean = false

  constructor(private surveyService: SurveyService) {
    this.viewSurveySub = this.surveyService.$viewSurveyList.subscribe(
      viewSurvey => this.viewSurvey = viewSurvey
    )
  }

  ngOnInit(): void {
    this.surveyService.getSurveyList()
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
}
