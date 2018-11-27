import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NavigationModule } from '../provider/main-layout/navigation/navigation.module';
import { MaterialModule } from './../../material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavigationModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
