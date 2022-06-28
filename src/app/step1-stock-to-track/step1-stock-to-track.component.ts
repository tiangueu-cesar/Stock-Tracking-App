import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StockTrackingAppService } from "../stock-tracking-app.service";
import { HttpErrorResponse } from "@angular/common/http";
import { StockModel } from "../models/stock.model";
import { ResultModel } from "../models/result.model";

@Component({
  selector: 'app-step1-stock-to-track',
  templateUrl: './step1-stock-to-track.component.html',
  styleUrls: ['./step1-stock-to-track.component.css']
})
export class STEP1StockToTrackComponent implements OnInit {

  submitSearch!: FormGroup;
  symbol!: string;
  stockQuoteData!: StockModel [];
  companyData!: ResultModel [];

  constructor(private fb: FormBuilder, private stockTrackingService: StockTrackingAppService) {
    this.submitSearch = this.fb.group({
      symbolName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  onTrackStock() {
    this.symbol = this.submitSearch.controls['symbolName'].value;
    this.stockTrackingService.getCurrentStockQuote(this.symbol).subscribe(
      () => {
        this.stockQuoteData = this.stockTrackingService.getStockDataFromLocalStorage();
        console.log(this.stockQuoteData);
        console.log("Length: stockQuote " + this.stockQuoteData.length);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });

    this.stockTrackingService.getCompanyInformation(this.symbol).subscribe(
      () => {
        this.companyData = this.stockTrackingService.getCompanyDataFromLocalStorage();
        console.log(this.companyData);
        console.log("Length: Company " + this.companyData.length);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
