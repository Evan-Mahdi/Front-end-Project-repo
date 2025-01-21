import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class EventListService {

  constructor(private http:HttpClient) { }

  public getAllEvents():Observable<any>{
   return this.http.get<any>(`${environment.apiUrl}/events`)
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/events/${id}`);
  }
  addEvent(event:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/events`,event)
  }

  updateEvent(id:number,event:any):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/events/${id}`,event)
  }
  deleteEventById(id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/events/${id}`)
   }
}
