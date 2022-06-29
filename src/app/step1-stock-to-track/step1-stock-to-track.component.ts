import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StockTrackingAppService } from "../stock-tracking-app.service";
import { HttpErrorResponse } from "@angular/common/http";
import { StockModel } from "../models/stock.model";
import { ResultModel } from "../models/result.model";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { forkJoin } from "rxjs";


@Component({
  selector: 'app-step1-stock-to-track',
  templateUrl: './step1-stock-to-track.component.html',
  styleUrls: ['./step1-stock-to-track.component.css']
})
export class STEP1StockToTrackComponent implements OnInit {

  submitSearch!: FormGroup;
  symbol!: string;
  stockQuoteData!:StockModel [];
  companyData!: ResultModel [];

  constructor(private fb: FormBuilder, private stockTrackingService: StockTrackingAppService,
              @Inject(LOCAL_STORAGE)
              private storage: StorageService) {
    this.submitSearch = this.fb.group({
      symbolName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.stockQuoteData = this.stockTrackingService.getStockDataFromLocalStorage();
    this.companyData = this.stockTrackingService.getCompanyDataFromLocalStorage();
  }


  onTrackStock() {
    this.symbol = this.submitSearch.controls['symbolName'].value;

    //Enable the execution of more than one coming source
    forkJoin([
      this.stockTrackingService.getCurrentStockQuote(this.symbol.toUpperCase()),
      this.stockTrackingService.getCompanyInformation(this.symbol.toUpperCase()),
    ]).subscribe({
      next: () => {
        this.stockQuoteData = this.stockTrackingService.getStockDataFromLocalStorage();
        this.companyData = this.stockTrackingService.getCompanyDataFromLocalStorage();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message ?? err);
      }
    })
  }

  deleteStock(id: number) {
    this.stockQuoteData = this.stockTrackingService.deleteAndRetrieveStockData(id);
    this.companyData = this.stockTrackingService.deleteAndRetrieveCompanyData(id);
  }

}
