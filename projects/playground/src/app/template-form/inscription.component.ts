import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styles: [``],
})
export class AppInscriptionComponent {
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
