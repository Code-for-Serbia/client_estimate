import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {StepListComponent} from "./app.component";


@NgModule({
  declarations: [
    StepListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [StepListComponent]
})
export class AppModule { }
