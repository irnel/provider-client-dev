import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './../../../material/material.module';
import { AgmCoreModule } from '@agm/core';

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
import { EditProductWorkspaceComponent } from './edit-product-workspace/edit-product-workspace.component';
import { EditCashierWorkspaceComponent } from './edit-cashier-workspace/edit-cashier-workspace.component';

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
    EditCategoryWorkspaceComponent,
    EditProductWorkspaceComponent,
    EditCashierWorkspaceComponent
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
    EditProviderWorkspaceComponent,
    EditProductWorkspaceComponent,
    EditCashierWorkspaceComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
