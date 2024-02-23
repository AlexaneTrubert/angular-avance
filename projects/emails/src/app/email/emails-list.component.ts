import {Component, OnInit} from '@angular/core';
import {FAKE_EMAILS_DATA} from "../data";
import {Email} from "./types";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-emails-list',
  template: `
    <div *ngIf="emailsAndTitle$ | async as data">
      <h1>{{ data.title }}</h1>
      <table class="table">
        <tbody>
        <tr [class.fw-bold]="!email.read" *ngFor="let email of data.emails" (click)="goToEmail(email.id)">
          <td>{{ email.contactName }}</td>
          <td class="w-50">{{ email.subject }}</td>
          <td>{{ email.date }}</td>
          <td>
            <button class="btn btn-sm btn-danger">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    tr:hover {
      background-color: black;
    }

    tr {
      cursor: pointer;
    }
  `]
})
export class EmailsListComponent implements OnInit {
  emailsAndTitle$?: Observable<{ emails: Email[], title: string }>

  constructor(private route: ActivatedRoute,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.emailsAndTitle$ = this.route.paramMap.pipe(
      map(param => param.get('type')),
      map(type => {
        if (!type) {
          return {
            emails: (FAKE_EMAILS_DATA as Email[]).filter(
              (email) => email.status === 'INBOX'
            ),
            title: "Boite de réception"
          }
        }

        return {
          emails: (FAKE_EMAILS_DATA as Email[]).filter(
            (email) => email.status === type?.toUpperCase()
          ),
          title: type === 'sent' ? "Emails envoyés" : "Corbeille"
        }
      })
    )

  }

  goToEmail(id: number) {
    this.router.navigateByUrl(`/emails/read/${id}`)
  }
}
