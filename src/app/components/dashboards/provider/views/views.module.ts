import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './../../../material/material.module';

import {
  StatsCardComponent,
  StatsCard1Component,
  ChartsComponent,
  BasicTableComponent,
  HomeWorkspaceComponent,
  ProviderWorkspaceComponent,
  ProductWorkspaceComponent,
  CategoryWorkspaceComponent,
  CashierWorkspaceComponent,
  OrderWorkspaceComponent
} from './index';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    StatsCardComponent,
    StatsCard1Component,
    ChartsComponent,
    BasicTableComponent,
    HomeWorkspaceComponent,
    ProviderWorkspaceComponent,
    ProductWorkspaceComponent,
    CategoryWorkspaceComponent,
    CashierWorkspaceComponent,
    OrderWorkspaceComponent
  ],
  exports: [
    StatsCardComponent,
    StatsCard1Component,
    ChartsComponent,
    BasicTableComponent,
    HomeWorkspaceComponent,
    ProviderWorkspaceComponent,
    ProductWorkspaceComponent,
    CategoryWorkspaceComponent,
    CashierWorkspaceComponent,
    OrderWorkspaceComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
