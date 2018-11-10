import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NavigationModule } from '../provider/main-layout/navigation/navigation.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavigationModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
