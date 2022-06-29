import { SentimentDataModel } from "./sentiment.data.model";

export interface SentimentModel {
  symbol: string;
  data: SentimentDataModel [];
}
