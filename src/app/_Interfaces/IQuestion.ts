import {ISurvey} from "./ISurvey";

export interface IQuestion{
  id?: number,
  surveyOwner?: ISurvey,
  prompt: string,
  answer?: string,
  responseType?: string
}
