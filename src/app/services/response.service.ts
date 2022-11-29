import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IResponse} from "../_Interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  public $responseList = new BehaviorSubject<IResponse[]>([])
  public $response = new BehaviorSubject<IResponse | null>(null)
  public $responsesByInstance = new BehaviorSubject<IResponse[]>([])

  constructor(private httpService: HttpService) { }

  public getResponseList(){
    this.httpService.getResponseList().pipe(first()).subscribe({
      next: responseList => {
        this.$responseList.next(responseList)
      },
      error: err => {
        console.error(err)
        alert("Unable to get list of responses, please try again later.")
      }
    })
  }

  public getResponseById(responseId: number){
    this.httpService.getResponseById(responseId).pipe(first()).subscribe({
      next: response => {
        this.$response.next(response)
      },
      error: err => {
        console.error(err)
        alert("Unable to get completed response, please try again later.")
      }
    })
  }

  public getResponsesByInstance(instance: number){
    this.httpService.getResponsesByInstance(instance).pipe(first()).subscribe({
      next: responsesByInstance => {
        this.$responsesByInstance.next(responsesByInstance)
      },
      error: err => {
        console.error(err)
        alert("Unable to get responses, please try again later.")
      }
    })
  }
}
