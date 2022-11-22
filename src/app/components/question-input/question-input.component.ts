import {Component, Input, OnInit, Output} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.css']
})
export class QuestionInputComponent implements OnInit {

  // @Input() questionInput!: IQuestion
  @Input() newQuestion: IQuestion = {
    prompt: "",
    responseType: "",
  }

  booleanResponse: String = "booleanResponse"
  multiResponse: String = "multiResponse"
  textResponse: String = "textResponse"

  newQuestionAdded: boolean = false

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  onAddQuestionClick(){
    console.log(this.newQuestion)
    this.questionService.addNewQuestionToNewSurvey(this.newQuestion)
    this.newQuestionAdded = true
  }

  checkInputs() {
    console.log(this.newQuestion)
  }
}
