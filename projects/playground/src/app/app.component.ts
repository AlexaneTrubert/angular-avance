import {Component} from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent {

  get email() {
    return this.inscription.controls.email;
  }

  get password() {
    return this.security.controls.password;
  }

  get confirm() {
    return this.security.controls.confirm;
  }

  get security() {
    return this.inscription.controls.security;
  }

  get languages() {
    return this.inscription.controls.languages;
  }

  inscription = new FormGroup({
    languages: new FormArray<FormGroup>([]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    security: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirm: new FormControl('', [Validators.required]),
    })
  });

  onSubmit() {
    console.log(this.inscription.value)
  }

  addLanguage() {
    this.languages.push(new FormGroup({
      name: new FormControl(),
      level: new FormControl('débutant')
    }));
  }
}
