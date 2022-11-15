import {Component, Input, OnInit} from '@angular/core';
import {ISurvey} from "../../_Interfaces/ISurvey";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input() survey!: ISurvey;

  constructor() { }

  ngOnInit(): void {
  }

}
