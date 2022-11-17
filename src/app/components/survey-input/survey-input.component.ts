import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class SurveyInputComponent implements OnInit {

  @Output() creatingSurvey = new EventEmitter<boolean>()
  createSurvey: boolean = false

  newSurvey: ISurvey = {
    id: 0,
    title: ""
  }

  savedNewSurveyTitleCheck: number = 0

  listQuestionInput: IQuestion[] = []
  // listQuestionInputSub: Subscription

  constructor(private surveyService: SurveyService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }

  cancelCreateSurveyClick() {
    this.creatingSurvey.emit(this.createSurvey)
  }

  onCreateSurveyClick(){
    if (this.savedNewSurveyTitleCheck < 1){
      alert("Please give survey a title and click save!")
      return;
    }

    if (this.newSurvey.title == ""){
      alert("Please give survey a title!")
      return;
    }

    if (this.listQuestionInput.length < 1){
      alert("Must add at least one question to the survey!")
      return
    }

    // TODO: MOVE THIS TO SAVE TITLE NAME
    let newSurveyId: number = new Date().getTime()
    let newSurvey: ISurvey = {
      id: newSurveyId,
      title: this.newSurvey.title
    }

    console.log(this.newSurvey)
    this.surveyService.createNewSurvey(newSurvey)
  }

  onAddNewQuestionToNewSurveyClick(){

    let newQuestionId: number = new Date().getTime()
    let newQuestion: IQuestion = {
      id: newQuestionId,
      surveyOwner: 0,
      prompt: ""
    }

    this.listQuestionInput.push(newQuestion)
    console.log(newQuestion)
    console.log(this.listQuestionInput)
    this.questionService.addQuestionToNewSurvey(newQuestion)
  }

  onSaveNewSurveyTitleClick() {
    if (this.newSurvey.title == ""){
      alert("Please give survey a title!")
      return;
    }


    console.log(this.newSurvey.title)
    this.savedNewSurveyTitleCheck = this.savedNewSurveyTitleCheck + 1
    alert("New Survey Title has been saved! You can now add questions!")


  }

  // ngOnDestroy(): void {
  //   this.listQuestionInputSub.unsubscribe()
  // }
}
