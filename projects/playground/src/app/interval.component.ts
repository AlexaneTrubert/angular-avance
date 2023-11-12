import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subject, Subscription, takeUntil} from "rxjs";
import {MoviesService} from "./movies/movies.service";


@Component({
  selector: 'app-interval',
  template: `
    Interval : {{ counter$ | async }}
  `,
  styles: []
})
export class IntervalComponent implements OnInit {
  counter$?: Observable<number>;

  constructor(private service : MoviesService) {
  }

  ngOnInit() {
    this.counter$ = interval(1000);
  }
}
