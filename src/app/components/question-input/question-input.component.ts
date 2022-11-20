import {Component, Input, OnInit, Output} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.css']
})
export class QuestionInputComponent implements OnInit {

  @Input() questionInput!: IQuestion
  @Output() newQuestion: IQuestion = {
    prompt: "",
    responseType: ""
  }

  booleanResponse: String = "boolean-response"
  multiResponse: String = "multi-response"
  textResponse: String = "text-response"

  constructor() { }

  ngOnInit(): void {
  }

  checkInputs() {
    console.log(this.newQuestion)
  }
}
