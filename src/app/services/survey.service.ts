import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {ISurvey} from "../_Interfaces/ISurvey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  public $surveyList = new BehaviorSubject<ISurvey[]>([])
  public $survey = new BehaviorSubject<ISurvey | null>(null)

  constructor(private httpService: HttpService) { }

  public getSurveyList(){
    this.httpService.getSurveyList().pipe(first()).subscribe({
      next: surveyList => {
        this.$surveyList.next(surveyList)
      },
      error: err => {
        console.error(err)
        alert("Unable to get list of surveys, please try again later.")
      }
    })
  }

  public getSurveyById(surveyId: number){
    this.httpService.getSurveyById(surveyId).pipe(first()).subscribe({
      next: survey => {
        this.$survey.next(survey)
      },
      error: err => {
        console.error(err)
        alert("Unable to get survey, please try again later.")
      }
    })
  }

}
