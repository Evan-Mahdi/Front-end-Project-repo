import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  @Input() event!:any;

  constructor(private router :Router){
    
  }
  navigateToForm(eventId:any):void{
    this.router.navigate(["/add-form",eventId])
    }
}
