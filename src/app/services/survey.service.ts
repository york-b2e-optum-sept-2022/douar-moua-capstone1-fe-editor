import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first, Subject} from "rxjs";
import {ISurvey} from "../_Interfaces/ISurvey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  public $surveyList = new BehaviorSubject<ISurvey[]>([])
  public $survey = new BehaviorSubject<ISurvey | null>(null)

  public viewSurveyList: boolean = false
  public $viewSurveyList = new Subject<boolean>()

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

  public deleteSurveyById(surveyId: number){
    this.httpService.deleteSurveyById(surveyId).pipe(first()).subscribe({
      next: () => {
        let surveyList: ISurvey[] = [...this.$surveyList.getValue()];
        this.$surveyList.next(
          surveyList.filter(survey => survey.id !== surveyId)
        )
        this.$viewSurveyList.next(this.viewSurveyList)
      },
      error: err => {
        console.error(err)
        alert("Unable to delete survey, please try again later.")
      }
    })
  }

  public saveEditSurvey(survey: ISurvey){
    console.log(survey)
    this.httpService.saveEditSurvey(survey)
  }

}
