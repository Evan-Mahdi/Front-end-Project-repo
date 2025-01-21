import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventListService } from '../event-list/event-list.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  
  eventForm!: FormGroup;
  eventId!: number;
  event!:any;
  // public imagUrl=""

  constructor(
  private fb: FormBuilder, 
  private eventSvc:EventListService, 
  private router :Router,
  private route :ActivatedRoute) {}

  ngOnInit() {
    // Initialize the form
    this.eventForm = this.fb.group({
      buttonValue: [''],
      title: [''],         
      description: [''],   
      date:[""],
      time:[""],
      allDay: [''],   
    });
    // This + is unary operator converts the string value returned by get('id') to a number.
    this.eventId = +this.route!.snapshot!.paramMap!.get('id')!;

    if (this.eventId) {
      // Fetch the device data and populate the form
      this.eventSvc.getEventById(this.eventId).subscribe((event:any) => {
        // Patch the form with device data
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          allDay: event.allDay
        });
      });
      // this.getImgUrl(this.deviceId)
    }
  }

  // Function to handle form submission
  onSubmit(event:Event) {
    event.preventDefault(); // Prevent the default form submission behavior
     // Get the target form element
     this.eventId = +this.route!.snapshot!.paramMap!.get('id')!;
     console.log(this.eventId);
     
     const target = event.target as HTMLFormElement;
     // Use querySelector to get the button and cast it to HTMLButtonElement
     const button = target.querySelector('button[type="submit"]:focus') as HTMLButtonElement;
     const buttonValue = button?.value; 
 
     console.log(`This is the buttonValue: ${buttonValue}`);

    if (this.eventForm.valid) {
      try{
        if(buttonValue==="Add Item"){
          const newEvent = this.eventForm.value;
          console.log(`new Event added ${newEvent}`);
          this.eventSvc.addEvent(newEvent).subscribe((response)=>{
            console.log("Event added",response);
            //reset a form
            this.eventForm.reset()
            this.router.navigate(['/event-list'])
          })
        }
        else if (buttonValue==="Edit Item"){
          console.log("Editing item...");
          const newEvent = this.eventForm.value;
          console.log(newEvent);

          this.editEventDetails(this.eventId,newEvent)
        }
        else if(buttonValue==="Delete Item"){
         this.deleteEventById(this.eventId)
        }
        else{
          console.log("Button value doesn't exist");
          
        }
        
      }catch(error){
        console.log("Erro adding new Device",error);
      }
    } else {
      console.error('Form is invalid');
    }
  }
  

  public editEventDetails(id:number,event:any){
    this.eventSvc.updateEvent(id,event).subscribe(()=>{
      console.log(`Event ${event.title}Updated`);
      this.router.navigate(['/event-list'])

    })
  }

  public deleteEventById(id:any):void{
    this.eventSvc.deleteEventById(id).subscribe(()=>{
      this.router.navigate(['/event-list'])
    }); 
  }

}


