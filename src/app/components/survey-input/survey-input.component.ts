import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {SurveyService} from "../../services/survey.service";
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";

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

  constructor(private surveyService: SurveyService, private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  cancelCreateSurveyClick() {
    this.creatingSurvey.emit(this.createSurvey)
  }

  onCreateSurveyClick(){
    if (this.newSurvey.title == ""){
      alert("Please give survey a title!")
      return;
    }

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
    console.log(newQuestion)
    this.questionService.addQuestionToNewSurvey(newQuestion)
  }
}
