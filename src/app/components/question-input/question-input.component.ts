import {Component, Input, OnInit} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.css']
})
export class QuestionInputComponent implements OnInit {

  @Input() questionInput!: IQuestion

  constructor() { }

  ngOnInit(): void {
  }

}
