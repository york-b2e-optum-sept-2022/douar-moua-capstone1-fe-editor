import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {ISurvey} from "../_Interfaces/ISurvey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  public $surveyList = new BehaviorSubject<ISurvey[]>([])

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

}
