import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  meetings$: Observable<any>;
  weathers$: Observable<any>;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.meetings$ = this.apiService.readCalendar();
    this.weathers$ = this.apiService.readWeather();
    setInterval(() => {
      location.reload();
    }, 300000);
    setTimeout(() => {
      // wait 3 seconds for everything to load
      this.loopScreen();
    }, 3000);
  }

  loopScreen() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    if (height > window.innerHeight) {
      setInterval(() => {
        // time to scroll to bottom, using 2 sec
        this.scrollTo(document.documentElement, document.documentElement.scrollHeight, 2000);
        // time to scroll to top, staying 4 - 2 sec
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 4000);
        // loop every 10 sec
      }, 10000);
    }
  }

  // animate scrolling
  scrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;
    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t + b; }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}
