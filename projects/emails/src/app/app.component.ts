import {Component, OnInit} from '@angular/core';
import {AuthService} from "./user/auth.service";
import {GuardsCheckEnd, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emails';
  isAuthenticated$?: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.auth.authStatus$;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/account/login');
  }
}
