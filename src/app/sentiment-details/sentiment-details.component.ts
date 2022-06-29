import {Component, Inject, OnInit} from '@angular/core';
import { SentimentDataModel } from "../models/sentiment.data.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {StockTrackingAppService} from "../stock-tracking-app.service";
import {ResultModel} from "../models/result.model";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.css']
})
export class SentimentDetailsComponent implements OnInit {
  sentimentsDatas!: SentimentDataModel[];
  companyName!: string | null;
  companyInformation!: any;
  StockId!: number;
  monthNames: string [] = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private stockTrackingAppService: StockTrackingAppService,
              @Inject(LOCAL_STORAGE)
              public storage: StorageService) { }

  ngOnInit(): void {
    this.companyInformation = this.storage.get('SelectedStock') as ResultModel;

    this.activatedRoute.paramMap.subscribe(params => {
      this.companyName = params.get('id');
      this.stockTrackingAppService.getSentimentByCompanyNameAndMonths(this.companyName).subscribe(
        (data: SentimentDataModel[]) => {
          this.sentimentsDatas = data;
          console.log(this.sentimentsDatas);
          this.router.navigate(['/sentiment', this.companyName]);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    })
  }

}
