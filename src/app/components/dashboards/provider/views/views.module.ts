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
import { EditProviderWorkspaceComponent } from './edit-provider-workspace/edit-provider-workspace.component';


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
    OrderWorkspaceComponent,
    EditProviderWorkspaceComponent
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
