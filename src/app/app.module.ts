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
import { LoginComponent } from './login/login.component';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    EventDetailsComponent,
    SiteHeaderComponent,
    HomeComponent,
    EventListComponent,
    LoginComponent,
    
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AuthModule.forRoot({
      domain: 'dev-zdhufkgv0kmvghgz.us.auth0.com',
      clientId: '8kJXWvZfdC99lLAFJe0bOO8TqlhMo9eo',  
      authorizationParams: {
        redirect_uri: window.location.origin + "/home"
      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
