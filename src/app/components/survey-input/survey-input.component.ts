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
  }
  booleanResponse: String = "booleanResponse"
  multiResponse: String = "multiResponse"
  textResponse: String = "textResponse"

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
    alert("New Survey Title has been saved! You can now add questions!")
    this.savedNewSurveyTitleCheck = true
  }

  addNewQuestionToSurveyClick() {
    if (this.savedNewSurveyTitleCheck == false){
      alert("Please add title and click save before adding questions!")
      return
    }
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
