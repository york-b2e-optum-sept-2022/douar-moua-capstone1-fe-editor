import { Component } from '@angular/core';
import {SurveyService} from "./services/survey.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'douar-moua-capstone1-fe-editor';

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.surveyService.getSurveyList()
  }
}
