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

  // --- SURVEY STUFF ---

  public createNewSurvey(newSurvey: ISurvey){
    console.log(newSurvey)
    return this.httpClient.post('http://localhost:8080/api/survey',
      {
        id: newSurvey.id,
        title: newSurvey.title
      }) as Observable<ISurvey>
  }

  public getSurveyList(){
    return this.httpClient.get('http://localhost:8080/api/survey/all-survey'
    ) as Observable<ISurvey[]>
  }

  public getSurveyById(surveyId: number){
    return this.httpClient.get(`http://localhost:8080/api/survey?surveyId=${surveyId}`
    ) as Observable<ISurvey>
  }

  public deleteSurveyById(surveyId: number){
    return this.httpClient.delete(`http://localhost:8080/api/survey?surveyId=${surveyId}`)
  }

  public saveEditSurvey(updateSurvey: ISurvey){
    console.log(updateSurvey)
    return this.httpClient.put('http://localhost:8080/api/survey',
      {
        id: updateSurvey.id,
        title: updateSurvey.title
      }) as Observable<ISurvey>
  }

  // --- QUESTIONS STUFF ---

  public getSurveyQuestionList(surveyId: number){
    return this.httpClient.get(`http://localhost:8080/api/question?surveyId=${surveyId}`
    ) as Observable<IQuestion[]>
  }

  public deleteQuestionById(questionId: number){
    return this.httpClient.delete(`http://localhost:8080/api/question?questionId=${questionId}`)
  }
}
