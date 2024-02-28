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
  type?: string | null;

  constructor(private route: ActivatedRoute,
              private router: Router
              ) {}

  ngOnInit(): void {
      this.emailsAndTitle$ = this.route.data.pipe(
        map(data => {
          return {
            emails: data['emails'] as Email[],
            title: data['title'],
          };
        })
      );
  }

  goToEmail(id: number) {
    if(!this.type) {
      this.router.navigate(['read', id], {relativeTo: this.route})
      return;
    }
    this.router.navigate(['../', 'read', id], {relativeTo: this.route})
  }
}
