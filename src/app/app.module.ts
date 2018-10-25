import { AngularFireModule } from 'angularfire2';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
