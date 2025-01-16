import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFormComponent } from './add-form/add-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    EventDetailsComponent,
    SiteHeaderComponent,
    HomeComponent,
    EventListComponent,
    
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
