import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './../../../material/material.module';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';

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
  OrderWorkspaceComponent,
  EditProviderWorkspaceComponent,
  EditCategoryWorkspaceComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'inline', maxOpened: 1 }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD_TkIqjNZTh2o0KmV10tQ7G1tIPCrdEU4' })
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
    OrderWorkspaceComponent,
    EditProviderWorkspaceComponent,
    EditCategoryWorkspaceComponent
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
    OrderWorkspaceComponent,
    EditProviderWorkspaceComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
