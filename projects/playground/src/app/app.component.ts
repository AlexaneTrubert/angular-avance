import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playground';
  data = {
    email: 'trubert.alexane@orange.fr',
    color: 'red',
    password: 'password',
  }
  @ViewChild('email')
  emailInput?: ElementRef<HTMLInputElement>;

  onSubmit(form: NgForm) {
    if(form.invalid)
    {
      return;
    }
    console.log(form.value);
  }
}
