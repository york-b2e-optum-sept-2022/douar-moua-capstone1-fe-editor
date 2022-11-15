import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISurvey} from "../_Interfaces/ISurvey";
import {IQuestion} from "../_Interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public getSurveyList(){
    return this.httpClient.get('http://localhost:8080/api/survey/all-survey'
    ) as Observable<ISurvey[]>
  }

  public getSurveyQuestionList(surveyId: number){
    return this.httpClient.get(`http://localhost:8080/api/question?surveyId=${surveyId}`
    ) as Observable<IQuestion[]>
  }
}
