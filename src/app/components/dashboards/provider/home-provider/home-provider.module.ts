import { NavigationModule } from './../main-layout/navigation/navigation.module';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeProviderComponent } from './home-provider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavigationModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    HomeProviderComponent
  ],
  exports: [
    HomeProviderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeProviderModule { }