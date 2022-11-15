import {Component, Input, OnInit} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question!: IQuestion;

  constructor() { }

  ngOnInit(): void {
  }

}
