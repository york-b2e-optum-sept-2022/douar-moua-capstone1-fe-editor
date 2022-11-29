import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { SurveyInputComponent } from './components/survey-input/survey-input.component';
import { QuestionInputComponent } from './components/question-input/question-input.component';
import { QuestionInputListComponent } from './components/question-input-list/question-input-list.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ResponseComponent } from './components/response/response.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyListComponent,
    QuestionComponent,
    QuestionListComponent,
    SurveyInputComponent,
    QuestionInputComponent,
    QuestionInputListComponent,
    ResponseListComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
