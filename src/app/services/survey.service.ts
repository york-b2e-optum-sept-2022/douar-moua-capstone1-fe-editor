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

  public isEditingSurvey: boolean = false
  public $isEditingSurvey = new Subject<boolean>()

  constructor(private httpService: HttpService) { }

  public createNewSurvey(newSurvey: ISurvey){

    this.httpService.createNewSurvey(newSurvey).pipe(first()).subscribe({
      next: newSurvey => {
        let surveyList: ISurvey[] = [...this.$surveyList.getValue()];
        surveyList.push(newSurvey);
        this.$surveyList.next(surveyList)
      },
      error: err => {
        console.error(err)
        alert("Unable to create new survey, please try again later.")
      }
    })
  }

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

  public saveEditSurvey(updateSurvey: ISurvey){
    console.log(updateSurvey)
    this.httpService.saveEditSurvey(updateSurvey).pipe(first()).subscribe({
      next: updatedSurvey => {
        let surveyList: ISurvey[] = [...this.$surveyList.getValue()];

        this.$surveyList.next(
          surveyList.map(survey => {
            if (survey.id !== updateSurvey.id){
              return survey
            }
            return updatedSurvey
          })
        )
      },
      error: err => {
        console.error(err)
        alert("Unable to save edits to survey, please try again later.")
      }
    })
  }

  public toggleEditSurvey(){
    this.$isEditingSurvey.next(!this.isEditingSurvey)
  }

  public toggleEditSurveyCancel(){
    this.$isEditingSurvey.next(this.isEditingSurvey)
  }

}
