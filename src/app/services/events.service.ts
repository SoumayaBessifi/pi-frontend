import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { identifierName } from '@angular/compiler';
import { Subject } from 'rxjs';
import { user } from '../model/user';
import { Observable } from 'rxjs';
const httpHeaders = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  api_url = "http://127.0.0.1:8000/api/"

  private refreshEvent$ = new Subject<void>()
  get refreshEvent() {
    return this.refreshEvent$
  }
  constructor(private http: HttpClient) { }
  getEvent() {
    return this.http.get(this.api_url + `events`)
  }
  insertEvent(eventId: any, eventName: any, eventDesc: any, eventDate: any, eventCapacity: any, eventImg: any, eventCategory: any) {
    let formdata = {
      "eventId": eventId,
      "eventName": eventName,
      "eventDesc": eventDesc,
      "eventDate": eventDate,
      "eventCapacity": eventCapacity,
      "eventReservednb": 0,
      "eventImg": eventImg,
      "eventCategory": eventCategory
    }
    console.log(JSON.stringify(formdata));
    return this.http.post(this.api_url + `events`, formdata, httpHeaders).pipe(
      tap(() => {
        this.refreshEvent$.next()
      })
    )
  }
  deleteEvent(id: any) {
    return this.http.delete(this.api_url + `events/` + id).pipe(
      tap(() => {
        this.refreshEvent$.next()
      })
    )
  }

  updateEvent(id: any, eventName: any, eventDesc) {
    let formdata = {
      "eventId": "eventId",
      "eventName": eventName,
      "eventDesc": eventDesc,
      "eventDate": "2021-07-08T07:57:45.866Z",
      "eventCapacity": 0,
      "eventReservednb": 0,
      "eventImg": "string",
      "eventCategory": "string"
    }

    return this.http.put(this.api_url + `events/` + id, formdata, httpHeaders).pipe(
      map(event => {
        return event
      })
    )
  }
  participateEvent(id: any, user: any) {
    const data = {
      "fgkuser": user
    }
    return this.http.put(this.api_url + `events/` + id, data, httpHeaders).pipe(
      map(particpate => {
        return particpate
      })
    )
  }

  getUserEvents(): Observable<user[]> {

    return this.http.get<user[]>('http://127.0.0.1:8000/api/users');
  }

}
