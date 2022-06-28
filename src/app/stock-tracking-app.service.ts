import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StockModel } from "./models/stock.model";
import { map } from "rxjs/operators";
import { CompanyModel } from "./models/company.model";
import { ResultModel } from "./models/result.model";

@Injectable({
  providedIn: 'root'
})
export class StockTrackingAppService {
  token: string = "bu4f8kn48v6uehqi3cqg";
  baseUrl: string = "https://finnhub.io/api/v1";
  JSONDataStockQuote!: StockModel;
  JSONDataCompanyInformation!: ResultModel;
  arrayOfStockQuoteInLocalStorage: StockModel [] = [];
  arrayOfCompanyInformationInLocalStorage: ResultModel [] = [];

  constructor(private http: HttpClient) { }

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
          this.arrayOfStockQuoteInLocalStorage.push(this.JSONDataStockQuote);
          setTimeout(() => {
            localStorage.setItem("StockQuote", JSON.stringify(this.arrayOfStockQuoteInLocalStorage));
            }, 1500);
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
            this.arrayOfCompanyInformationInLocalStorage.push(this.JSONDataCompanyInformation);
            setTimeout(() => {
              localStorage.setItem("companyInformation", JSON.stringify(this.arrayOfCompanyInformationInLocalStorage));
            }, 1000)
      }));
  }

  getStockDataFromLocalStorage(): StockModel [] {
    let data = JSON.parse(<string>localStorage.getItem("StockQuote"));
    return JSON.parse(<string>localStorage.getItem("StockQuote"));
  }

  getCompanyDataFromLocalStorage(): ResultModel [] {
    let data = JSON.parse(<string>localStorage.getItem("companyInformation"));
    return JSON.parse(<string>localStorage.getItem("companyInformation"));
  }
}
