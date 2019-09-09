import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  STATUS = '';
  CALENDAR = '';
  WEATHER = '';
  constructor(private httpClient: HttpClient) { }

  readCalendar(): Observable<any> {
    const TODAY = new Date();
    const TOMORROW = new Date(TODAY.getTime() + (24 * 60 * 60 * 1000));
    TOMORROW.setHours(0, 0, 0, 0);
    return this.httpClient.get<any>(this.CALENDAR).pipe(
      tap(meetings => {
        meetings.forEach(meeting => {
          // convert time to js obj
          meeting.time = new Date(meeting.time * 1000);
          meeting.end = new Date(meeting.end * 1000);
          // set meeting organizer
          if (meeting.organizer) {
            meeting.organizer = meeting.organizer.displayName == null ? meeting.organizer.email : meeting.organizer.displayName;
          } else { meeting.organizer = ''; }
        });
      }),
      // need to return a value for map method
      // Only display today's meeting
      map(meetings => {
        return meetings.filter(meeting => {
          return meeting.time > TODAY && meeting.time < TOMORROW;
        });
      }),
    );
  }
  readWeather(): Observable<any> {
    return this.httpClient.get<any>(this.WEATHER).pipe(
      map(weathers => {
        return weathers.data;
      }),
      tap(weathers => {
        weathers.forEach(weather => {
          // convert C to F
          weather.max_temp = Math.round(weather.max_temp * 9 / 5 + 32);
          const DATE = new Date(weather.valid_date);
          weather.valid_date = DATE.getDay();
          switch (weather.valid_date) {
            case 0:
              weather.valid_date = 'Monday';
              break;
            case 1:
              weather.valid_date = 'Tuesday';
              break;
            case 2:
              weather.valid_date = 'Wednesday';
              break;
            case 3:
              weather.valid_date = 'Thursday';
              break;
            case 4:
              weather.valid_date = 'Friday';
              break;
            case 5:
              weather.valid_date = 'Saturday';
              break;
            case 6:
              weather.valid_date = 'Sunday';
              break;
          }
        });
      })
    );
  }
  readStatus(): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<any>(this.STATUS, {'responseType': 'html'});
  }
}
