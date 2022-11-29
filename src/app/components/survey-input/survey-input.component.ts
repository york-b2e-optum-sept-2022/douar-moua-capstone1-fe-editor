import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {SurveyService} from "../../services/survey.service";
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-survey-input',
  templateUrl: './survey-input.component.html',
  styleUrls: ['./survey-input.component.css']
})
export class SurveyInputComponent implements OnInit, OnDestroy {

  @Output() creatingSurvey = new EventEmitter<boolean>()
  createSurvey: boolean = false

  newSurvey: ISurvey = {
    id: 0,
    title: ""
  }

  newQuestion: IQuestion = {
    prompt: "",
    responseType: "",
    surveyOwner: this.newSurvey,
    multiChoiceAnswers: [],
    questionOrder: 0
  }

  numberOfQuestions: number = 0
  numberOfQuestionsArray: [] = []
  setNumberOfQuestionsCheck: boolean = false

  booleanResponse: String = "booleanResponse"
  multiResponse: String = "multiResponse"
  textResponse: String = "textResponse"

  multiChoiceAnswer: string = ""
  multiChoiceSelect: boolean = false
  addMultiChoiceClickCount: number = 0

  savedNewSurveyTitleCheck: boolean = false
  addedNewQuestionCheck: number = 0

  newSurveyQuestionList: IQuestion[] = []
  newSurveyQuestionListSub: Subscription

  constructor(private surveyService: SurveyService, private questionService: QuestionService) {
    this.newSurveyQuestionListSub = this.questionService.$newQuestionList.subscribe(
      questionList => this.newSurveyQuestionList = questionList)
  }

  ngOnInit(): void {
  }

  onSaveNewSurveyTitleClick() {
    if (this.newSurvey.title == ""){
      alert("Please give survey a title and click save!")
      return;
    }

      let newSurveyId: number = new Date().getTime()
      let newSurvey: ISurvey = {
        id: newSurveyId,
        title: this.newSurvey.title}
    this.newSurvey = newSurvey

    this.surveyService.createNewSurvey(this.newSurvey)
    this.savedNewSurveyTitleCheck = true
  }

  addNewQuestionToSurveyClick() {
    if (this.newQuestion.prompt == ""){
      alert("Please add question!")
      return
    }

    let newNumberOfQuestions = this.numberOfQuestionsArray.filter(number => number !== this.newQuestion.questionOrder)
    this.numberOfQuestionsArray = <[]>newNumberOfQuestions
    console.log(this.newQuestion.questionOrder)
    console.log(this.numberOfQuestionsArray.filter(number => number !== this.newQuestion.questionOrder))

    this.addedNewQuestionCheck = this.addedNewQuestionCheck + 1
    this.newQuestion.surveyOwner = this.newSurvey
    this.questionService.addNewSurveyQuestion(this.newQuestion)
  }

  onCreateSurveyClick(){
    if (this.savedNewSurveyTitleCheck == false || this.addedNewQuestionCheck <= 0){
      alert("Must add a title and at least one question!")
      return;
    }

    this.creatingSurvey.emit(this.createSurvey)
  }

  cancelCreateSurveyClick() {
    if (this.newSurvey.id !== 0){
      this.surveyService.deleteSurveyById(this.newSurvey.id)
    }

    this.newSurvey = {
      id: 0,
      title: ""
    }
    this.questionService.cancelCreateResetNewQuestionList()
    this.creatingSurvey.emit(this.createSurvey)
  }

  setNumberOfQuestions() {
    if (this.numberOfQuestions < 0) {
      this.numberOfQuestions = 0
      alert("Number of questions must be more than 0!")
      return;
    }

    if (this.numberOfQuestions > 0){
      this.numberOfQuestionsArray = []
      for (let i = 0; i < this.numberOfQuestions; i++){
        // @ts-ignore
        this.numberOfQuestionsArray.push(i + 1)
      }
      this.setNumberOfQuestionsCheck = true
    }

  }

  toggleMultiChoiceAnswer(){
    if (this.newQuestion.responseType == this.multiResponse){
      this.multiChoiceSelect = true;
    }
  }

  addMultipleChoiceAnswer(){
    this.newQuestion.multiChoiceAnswers?.push(this.multiChoiceAnswer)
    this.addMultiChoiceClickCount = this.addMultiChoiceClickCount + 1
  }

  ngOnDestroy(): void {
    this.newSurveyQuestionListSub.unsubscribe()
  }

  // onAddNewQuestionToNewSurveyClick(){
  //
  //   if(this.savedNewSurveyTitleCheck < 1){
  //     alert("Please add a survey title and click save before adding questions!")
  //     return
  //   }
  //
  //   let newQuestion: IQuestion = {
  //     id: 0,
  //     surveyOwner: this.newSurvey,
  //     prompt: ""
  //   }
  //
  //   this.questionService.addQuestionToNewSurveyDisplay(newQuestion)
  // }

}
