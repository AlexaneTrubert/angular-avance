import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Email} from "./types";
import {delay, Observable, of} from "rxjs";
import {FAKE_EMAILS_DATA} from "../data";

export class EmailResolver implements Resolve<Email[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email[]> | Promise<Email[]> | Email[] {
    const type = route.paramMap.get('type');

    let emails: Email[];

    if (!type) {
      emails = (FAKE_EMAILS_DATA as Email[]).filter(
        (email) => email.status === 'INBOX'
      );
    } else {
      emails =  (FAKE_EMAILS_DATA as Email[]).filter(
        (email) => email.status === type?.toUpperCase()
      );
    }

    return of(emails).pipe(delay(2000));
  }

}
