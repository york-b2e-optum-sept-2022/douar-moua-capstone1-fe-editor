import {Component, Input, OnInit} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input() survey!: ISurvey;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getSurveyQuestionList(<number>this.survey.id)
  }

}
