import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {ISurvey} from "../../_Interfaces/ISurvey";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  surveyList: ISurvey[] = []
  surveyListSub: Subscription

  constructor(private surveyService: SurveyService) {
    this.surveyListSub = this.surveyService.$surveyList.subscribe(
      surveyList => {this.surveyList = surveyList}
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.surveyListSub.unsubscribe();
  }

}
