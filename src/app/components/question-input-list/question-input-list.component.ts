import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-input-list',
  templateUrl: './question-input-list.component.html',
  styleUrls: ['./question-input-list.component.css']
})
export class QuestionInputListComponent implements OnInit, OnDestroy {

  listQuestionInput: IQuestion[] = []
  listQuestionInputSub: Subscription

  // @Input() createNewSurveyClicked: boolean = true

  constructor(private questionService: QuestionService) {
    this.listQuestionInputSub = this.questionService.$newQuestionList.subscribe(
      questionList => this.listQuestionInput = questionList)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.listQuestionInputSub.unsubscribe()
  }

}
