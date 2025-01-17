import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { FormsModule } from '@angular/forms';
import { EventListComponent } from './event-list/event-list.component';
import { AddFormComponent } from './add-form/add-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SiteHeaderComponent,
    EventListComponent,
    AddFormComponent,
    EventDetailsComponent,
    LoginComponent
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
        redirect_uri: window.location.origin
      }
    }),
    // RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
