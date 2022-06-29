import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { STEP1StockToTrackComponent } from './step1-stock-to-track/step1-stock-to-track.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CurrentQuoteDataComponent } from './current-quote-data/current-quote-data.component';
import { CommonModule } from "@angular/common";
import { StockTrackingAppService } from "./stock-tracking-app.service";
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';

@NgModule({
  declarations: [
    AppComponent,
    STEP1StockToTrackComponent,
    CurrentQuoteDataComponent,
    SentimentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [StockTrackingAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
