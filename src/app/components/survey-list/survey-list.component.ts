import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {ISurvey} from "../../_Interfaces/ISurvey";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveyList: ISurvey[] = []

  constructor(private surveyService: SurveyService) {
    this.surveyService.$surveyList.subscribe(
      surveyList => {this.surveyList = surveyList}
    )
  }

  ngOnInit(): void {
  }

}
