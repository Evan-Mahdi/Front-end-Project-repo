import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  constructor(private http:HttpClient) { }

  public getAllEvents():Observable<any>{
   return this.http.get<any>('/api/events')
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`/api/events/${id}`);
  }
  addEvent(event:any):Observable<any>{
    return this.http.post<any>(`/api/events`,event)
  }

  updateEvent(id:number,event:any):Observable<any>{
    return this.http.put<any>(`/api/events/${id}`,event)
  }
  deleteEventById(id:number):Observable<any>{
    return this.http.delete(`/api/events/${id}`)
   }
}
