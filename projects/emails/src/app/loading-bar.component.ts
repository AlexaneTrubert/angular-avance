import {Component, OnInit} from '@angular/core';
import {
  ActivationStart,
  GuardsCheckEnd,
  NavigationEnd,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router
} from "@angular/router";
import {delay, filter, map, tap} from "rxjs";

@Component({
  selector: 'app-loading-bar',
  template: `
    <div class="relative">
      <div [style.display]="display" [style.width]="width" class="loading-bar"></div>
    </div>
  `,
  styles: [`
  .loading-bar {
    height: 5px;
    background-color: #008800;
    width: 0%;
    transition: width 0.2s;
    position: absolute;
    top: 0;
    left: 0;
  }

  .relative {
    position: relative;
  }
  `
  ]
})
export class LoadingBarComponent implements OnInit {
  _width: number = 0;
  display = 'none';

  get width() {
    return `${this._width}%`;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    const percentMap = new Map();

    percentMap.set(ActivationStart, 30);
    percentMap.set(GuardsCheckEnd, 50);
    percentMap.set(ResolveStart, 80);
    percentMap.set(ResolveEnd, 100);

    this.router.events.pipe(
      tap(() => this.display = 'block'),
      delay(100),
      map((event) => percentMap.get(event.constructor)),
      filter(width => !!width),
      tap(width => this._width = width),
      filter(width => width === 100),
      delay(500)
    ).subscribe(() => {
      this._width = 0;
      this.display = 'none';
    });
  }
}
