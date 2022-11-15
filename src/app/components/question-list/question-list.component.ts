import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {IQuestion} from "../../_Interfaces/IQuestion";
import {ISurvey} from "../../_Interfaces/ISurvey";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy{

  @Input() survey!: ISurvey;

  questionList: IQuestion[] = []
  questionListSub: Subscription

  constructor(private questionService: QuestionService) {
    this.questionListSub = this.questionService.$questionList.subscribe(
      questionList => this.questionList = questionList)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.questionListSub.unsubscribe();
  }

}
