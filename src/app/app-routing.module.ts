import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {STEP1StockToTrackComponent} from "./step1-stock-to-track/step1-stock-to-track.component";

const routes: Routes = [
  {
    path: '',
    component: STEP1StockToTrackComponent
  },
  {
    path: '**',
    component: STEP1StockToTrackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
