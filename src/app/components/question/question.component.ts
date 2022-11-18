import {Component, Input, OnInit} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question!: IQuestion;

  isEditing: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  toggleEditClick() {
    this.isEditing = !this.isEditing
  }

  onDeleteQuestionClick(){
    console.log(this.question.id)
    this.questionService.deleteQuestionById(<number>this.question.id)
  }
}
