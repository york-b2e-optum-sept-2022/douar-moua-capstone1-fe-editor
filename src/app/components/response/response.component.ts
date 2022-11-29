import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ResponseService} from "../../services/response.service";
import {IResponse} from "../../_Interfaces/IResponse";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  response!: IResponse;
  responseSub: Subscription;

  constructor(private responseService: ResponseService) {
    this.responseSub = this.responseService.$response.subscribe(
      response => this.response = <IResponse>response
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.responseSub.unsubscribe()
  }

}
