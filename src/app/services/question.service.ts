import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IQuestion} from "../_Interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public $questionList = new BehaviorSubject<IQuestion[]>([])
  public $newQuestionList = new BehaviorSubject<IQuestion[]>([])

  constructor(private httpService: HttpService) { }

  public getSurveyQuestionList(surveyId: number){
    this.httpService.getSurveyQuestionList(surveyId).pipe(first()).subscribe({
      next: questionList => {
        this.$questionList.next(questionList)
      },
      error: err => {
        console.error(err)
        alert("Unable to get survey's list of questions, please try again later.")
      }
    })
  }

  public addQuestionToNewSurveyDisplay(newQuestion: IQuestion){
    let questionList: IQuestion[] = [...this.$newQuestionList.getValue()];
    questionList.push(newQuestion)
    console.log(questionList)
    return this.$newQuestionList.next(questionList)
  }


}
