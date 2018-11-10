import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { StatsCardComponent } from './stats-card/stats-card.component';
import { StatsCard1Component } from './stats-card1/stats-card1.component';
import { ChartsComponent } from './charts/charts.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    StatsCardComponent,
    StatsCard1Component,
    ChartsComponent,
    BasicTableComponent
  ],
  exports: [
    StatsCardComponent,
    StatsCard1Component,
    ChartsComponent,
    BasicTableComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
