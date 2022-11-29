import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseService} from "../../services/response.service";
import {Subscription} from "rxjs";
import {IResponse} from "../../_Interfaces/IResponse";

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit {

  responseList: IResponse[] = []
  responseListSub: Subscription

  @Output() viewResponse = new EventEmitter<boolean>()
  viewResponseClick: boolean = false

  constructor(private responseService: ResponseService) {
    this.responseListSub = this.responseService.$responseList.subscribe(
      responseList => this.responseList = responseList
    )
  }

  ngOnInit(): void {
  }

  onViewSurveyClick(response: IResponse) {
    this.responseService.getResponseById(response.id)
    this.responseService.getResponsesByInstance(response.instance)
    this.viewResponse.emit(!this.viewResponseClick)
  }

  ngOnDestroy(): void {
    this.responseListSub.unsubscribe();
  }

}
