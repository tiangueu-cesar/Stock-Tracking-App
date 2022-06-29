import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StockModel } from "./models/stock.model";
import { map } from "rxjs/operators";
import { CompanyModel } from "./models/company.model";
import { ResultModel } from "./models/result.model";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { SentimentModel } from "./models/sentiment.model";
import {SentimentDataModel} from "./models/sentiment.data.model";

@Injectable({
  providedIn: 'root'
})
export class StockTrackingAppService {
  token: string = "bu4f8kn48v6uehqi3cqg";
  baseUrl: string = "https://finnhub.io/api/v1";
  JSONDataStockQuote!: StockModel;
  JSONDataCompanyInformation!: ResultModel;
  stockQuoteDatas!: StockModel [];
  companyInformations!: ResultModel [];
  from: string = "2022-04-01";
  to: string = "2022-06-01";

  constructor(private http: HttpClient,
              @Inject(LOCAL_STORAGE)
              public storage: StorageService) { }

  getCurrentStockQuote(symbol: string): Observable<void> {
    return this.http.get<StockModel>(`${this.baseUrl}/quote?symbol=${symbol}&token=${this.token}`)
      .pipe(map(stockQuoteData => {
          this.JSONDataStockQuote = {
              "c": stockQuoteData.c,
              "d": stockQuoteData.d,
              "dp": stockQuoteData.dp,
              "h": stockQuoteData.h,
              "l": stockQuoteData.l,
              "o": stockQuoteData.o,
              "pc": stockQuoteData.pc,
              "t": stockQuoteData.t
            };
          const current = this.storage.get("StockQuote") ?? [];
          current.push(this.JSONDataStockQuote);
          this.storage.set("StockQuote", current);
      }));
  }

  getCompanyInformation(symbol: string): Observable<void> {
    return this.http.get<CompanyModel>(`${this.baseUrl}/search?q=${symbol}&token=${this.token}`)
      .pipe(map(companyData => {
            this.JSONDataCompanyInformation = {
                  "description": companyData.result[0].description,
                  "displaySymbol": companyData.result[0].displaySymbol,
                  "symbol": companyData.result[0].symbol,
                  "type": companyData.result[0].type
            }
            //Check if Key: CompanyInformation null | undefined. If yes return [], otherwise the data
            const current = this.storage.get("CompanyInformation") ?? [];
            current.push(this.JSONDataCompanyInformation);
            this.storage.set("CompanyInformation", current);
      }));
  }

  deleteAndRetrieveStockData(index: number): StockModel[] {
    const current = this.storage.get('StockQuote') as StockModel[];
    current.splice(index, 1);
    this.storage.set('StockQuote', current);
    return current;
  }

  deleteAndRetrieveCompanyData(index: number): ResultModel[] {
    const current = this.storage.get('CompanyInformation') as ResultModel[];
    current.splice(index, 1);
    this.storage.set('CompanyInformation', current);
    return current;
  }

  getStockDataFromLocalStorage(): StockModel [] {
    return this.storage.get('StockQuote');
  }

  getCompanyDataFromLocalStorage(): ResultModel [] {
    return this.storage.get('CompanyInformation');
  }

  getSentimentByCompanyNameAndMonths(symbol: any): Observable<SentimentDataModel[]> {
    return this.http.get<SentimentModel>(`${this.baseUrl}/stock/insider-sentiment?symbol=${symbol}&token=${this.token}&from=${this.from}&to=${this.to}`)
      .pipe(map(sentimentData => {
        return sentimentData.data;
      }));
  }

}
