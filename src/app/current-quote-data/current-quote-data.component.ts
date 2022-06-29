import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { StockModel } from "../models/stock.model";
import { ResultModel } from "../models/result.model";
import { StockTrackingAppService } from "../stock-tracking-app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SentimentDataModel } from "../models/sentiment.data.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";

@Component({
  selector: 'app-current-quote-data',
  templateUrl: './current-quote-data.component.html',
  styleUrls: ['./current-quote-data.component.css']
})
export class CurrentQuoteDataComponent implements OnInit {
  @Input()
  stockQuoteDatas: StockModel [] = [];
  @Input()
  companyDatas: ResultModel [] = [];
  @Output()
  onDelete: EventEmitter<number> = new EventEmitter<number>();
  sentimentsDatas!: SentimentDataModel [];
  public currentStockId!: number;

  constructor(@Inject(LOCAL_STORAGE)
    public storage: StorageService) { }

  ngOnInit(): void {
  }

  deleteStockQuote(id: number) {
    this.onDelete.emit(id);
  }

  getCurrentStockId(id: number) {
    const current = this.storage.get('CompanyInformation') as ResultModel[];
    current.forEach((val, index) => {
      if (index === id) {
        this.storage.set('SelectedStock', val);
      }
    });
  }

}
