import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IQuestion} from "../_Interfaces/IQuestion";
import {ISurvey} from "../_Interfaces/ISurvey";

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
    console.log(newQuestion)
    console.log(questionList)
    return this.$newQuestionList.next(questionList)
  }

  public deleteQuestionById(questionId: number){
    this.httpService.deleteQuestionById(questionId).pipe(first()).subscribe({
      next: () => {
        let questionList: IQuestion[] = [...this.$questionList.getValue()];
        this.$questionList.next(
          questionList.filter(question => question.id !== questionId)
        )
        console.log(questionList)
        this.$questionList.next(questionList)
      },
      error: err => {
        console.error(err)
        alert("Unable to delete question, please try again later.")
      }
    })
  }

  public saveQuestionUpdate(updateQuestion: IQuestion){
    console.log(updateQuestion)
    this.httpService.saveEditQuestion(updateQuestion).pipe(first()).subscribe({
      next: updatedQuestion => {

        let questionList: IQuestion[] = [...this.$questionList.getValue()];
        this.$questionList.next(
          questionList.map(question => {
            if (question.id !== updatedQuestion.id){
              return question
            }
            return updatedQuestion
          })
        )
      },
      error: err => {
        console.error(err)
        alert("Unable to update question, please try again later.")
      }
    })
  }

  public addNewQuestionToNewSurvey(newQuestion: IQuestion){
    let newSurveyQuestionList = [...this.$newQuestionList.getValue()]

    let newQuestionId = new Date().getTime()
    newQuestion.id = newQuestionId

    let newQuestionIndex = newSurveyQuestionList.indexOf(newQuestion)

    if (newQuestionIndex !== -1){
      newSurveyQuestionList[newQuestionIndex] = newQuestion
    }

    console.log("new question index in list: ", newQuestion)
    console.log("new question: ", newQuestionIndex)
    console.log("question list: ", newSurveyQuestionList)
    // this.httpService.addNewQuestions(newSurveyQuestionList, <ISurvey>newQuestion.surveyOwner)
  }

  public addNewQuestion(newQuestion: IQuestion){
    this.httpService.addNewQuestion(newQuestion, <ISurvey>newQuestion.surveyOwner).pipe(first()).subscribe({
      next: newQuestion => {
        let questionList: IQuestion[] = [...this.$questionList.getValue()]
        questionList.push(newQuestion)
        this.$questionList.next(questionList)
      },
      error: err => {
        console.error(err)
        alert("Unable to add new question, please try again later.")
      }
    })
  }

  public addNewSurveyQuestion(newQuestion: IQuestion){
    console.log(newQuestion)
    this.httpService.addNewQuestion(newQuestion, <ISurvey>newQuestion.surveyOwner).pipe(first()).subscribe({
      next: newQuestion => {
        let newQuestionList: IQuestion[] = [...this.$newQuestionList.getValue()]
        newQuestionList.push(newQuestion)
        this.$newQuestionList.next(newQuestionList)
      },
      error: err => {
        console.error(err)
        alert("Unable to add new question, please try again later.")
      }
    })
  }

  public cancelCreateResetNewQuestionList(){
    let resetNewQuestionList: IQuestion[] = [...this.$newQuestionList.getValue()]
    resetNewQuestionList = []
    this.$newQuestionList.next(resetNewQuestionList)
  }

  // public addNewQuestions(newQuestions: IQuestion[], newSurvey: ISurvey){
  //   console.log(newQuestions, newSurvey)
  //   this.httpService.addNewQuestions(newQuestions, newSurvey)
  // }

}
