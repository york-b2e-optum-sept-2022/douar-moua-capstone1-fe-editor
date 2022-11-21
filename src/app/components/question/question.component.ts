import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_Interfaces/IQuestion";
import {QuestionService} from "../../services/question.service";
import {Subscription} from "rxjs";
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  @Input() question!: IQuestion;

  isEditingSurvey: boolean = false
  isEditingSurveySub: Subscription
  isEditingQuestion: boolean = false;

  deletedQuestion: boolean = false

  booleanResponse: String = "boolean-response"
  multiResponse: String = "multi-response"
  textResponse: String = "text-response"

  constructor(private questionService: QuestionService, private surveyService: SurveyService) {
    this.isEditingSurveySub = this.surveyService.$isEditingSurvey.subscribe(
      editingSurveyTrue => this.isEditingSurvey = editingSurveyTrue
    )
  }

  ngOnInit(): void {
  }

  toggleEditClick() {
    this.isEditingQuestion = !this.isEditingQuestion
  }

  onDeleteQuestionClick(){
    console.log(this.question.id)
    this.questionService.deleteQuestionById(<number>this.question.id)
    this.deletedQuestion=true
    // alert("You've deleted the question! Your view will be updated upon coming back to this page.")
  }

  ngOnDestroy(): void {
    this.isEditingSurveySub.unsubscribe()
  }

  onSaveEditQuestionClick() {
    console.log(this.question)
    this.questionService.saveQuestionUpdate(this.question)
  }
}
