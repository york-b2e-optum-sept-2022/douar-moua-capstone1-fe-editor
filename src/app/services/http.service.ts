import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISurvey} from "../_Interfaces/ISurvey";
import {IQuestion} from "../_Interfaces/IQuestion";
import {IResponse} from "../_Interfaces/IResponse";

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

  public saveEditQuestion(updateQuestion: IQuestion){
    return this.httpClient.put('http://localhost:8080/api/question',
      {
        id: updateQuestion.id,
        prompt: updateQuestion.prompt,
        responseType: updateQuestion.responseType
      }) as Observable<IQuestion>
  }

  public addNewQuestion(newQuestion: IQuestion, survey: ISurvey){
    console.log(newQuestion)
    return this.httpClient.post('http://localhost:8080/api/question',
      {
        surveyId: survey.id,
        prompt: newQuestion.prompt,
        responseType: newQuestion.responseType
      }) as Observable<IQuestion>
  }

  //TODO configure add several new questions
  // public addNewQuestions(newQuestions: IQuestion[], newSurvey: ISurvey){
  //   console.log(newQuestions)
  //   console.log(newSurvey.id)
  //   return this.httpClient.post(`http://localhost:8080/api/question/questions?surveyId=${newSurvey.id}`,
  //     {newQuestions: newQuestions
  //     }) as Observable<IQuestion[]>
  // }

  // --- RESPONSE STUFF ---

  public getResponseList(){
    return this.httpClient.get('http://localhost:8080/api/response/all-responses'
    ) as Observable<IResponse[]>
  }

  public getResponseById(responseId: number){
    return this.httpClient.get(`http://localhost:8080/api/response?responseId=${responseId}`
    ) as Observable<IResponse>
  }

  public getResponsesByInstance(instance: number){
    return this.httpClient.get(`http://localhost:8080/api/response/instance?instance=${instance}`
    ) as Observable<IResponse[]>
  }
}
