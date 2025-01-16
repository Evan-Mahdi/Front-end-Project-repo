import { Component } from '@angular/core';
import { CalendarEvent} from 'angular-calendar';
import { addMonths, subMonths, startOfToday, addDays } from 'date-fns';
import { EventListService } from '../event-list/event-list.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 view:string="month"
 viewDate:Date = new Date();
 events: CalendarEvent[] = [];  // List of events
 selectedEvent: CalendarEvent | null = null; // Event being edited
 selectedDate: Date | null = null; // Date that was clicked
 selectedEvents: CalendarEvent[] = []; // Events for the selected date
 refresh: Subject<any> = new Subject();


  public setView(view:string):void{
   this.view=view;
  }
 public previousMonth():void{
  this.viewDate=subMonths(this.viewDate,1);
 }
 public nextMonth():void{
  this.viewDate = addMonths(this.viewDate,1);
 }
 public currentDay():void{
  this.viewDate=startOfToday();
 }
ngOnInit(){
  this.loadEvents()
}
//Constructor
 constructor(
  private eventSvc: EventListService,
   private router:Router,private auth: AuthService,){}

   // Method to handle event creation on date click
   addEvent(date: any): void {
    const event: CalendarEvent = {
      start: date,
      end: addDays(date, 1), // Default duration is 1 day
      title: 'New Event',  // Default title
      meta: {} ,
      color: {
        primary: 'green',
        secondary: 'lightgray'
    },
      draggable:true
    };
    this.events.push(event);
    this.selectedEvent = event; // Select the newly added event for editing
    this.selectedEvents = [event]; // Update selected events for the clicked date
  }

  loadEvents(): void {
    this.eventSvc.getAllEvents().subscribe((data) => {
      this.events = data.map((event: any) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
        color:{primary:'green'},
        meta: { description: event.description },
        draggable:true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      }));
    });
  }

  handleDateClick(date: Date): void {
    this.selectedDate = date;
    this.selectedEvents = this.events.filter(event => 
      this.isSameDate(event.start, date)
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
  // Method to handle editing an event
  editEvent(event: CalendarEvent): void {
    // Set selected event for editing
    this.selectedEvent = event;
  } 

  closeModal(): void {
    this.selectedDate = null;
    this.selectedEvents = [];
  }

    
  // Save the changes made to the event
  saveEvent(): void {
    if (this.selectedEvent) {
      const index = this.events.findIndex((e) => e === this.selectedEvent);
      if (index !== -1) {
        this.events[index] = this.selectedEvent; // Update event
        this.selectedEvent = null; // Deselect event after saving
      }
    }
  }

  // Cancel editing and deselect event
  cancelEdit(): void {
    this.selectedEvent = null;
  }
  
  navigateToForm(eventId:any):void{
    this.router.navigate(["/add-form",eventId])
    }
   
   
}
