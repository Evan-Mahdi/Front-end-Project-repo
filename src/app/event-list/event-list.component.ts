import { Component } from '@angular/core';
import { EventListService } from './event-list.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
events:any;

  constructor(private eventSvc:EventListService){}

  ngOnInit(){
    this.eventSvc.getAllEvents().subscribe((events:any)=>{
      this.events=events;
      console.log(events);
    })
  }
  

}
