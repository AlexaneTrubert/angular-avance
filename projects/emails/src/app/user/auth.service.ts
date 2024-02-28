import {Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";

export class AuthService {
  authStatus$ = new BehaviorSubject<boolean>(true);
  login() {
    console.log("On se connecte")
    this.authStatus$.next(true);
  }

  logout() {
    console.log("On se déconnecte")
    this.authStatus$.next(false);
  }
}
