import {Component} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-inscription-reactive',
  templateUrl: './reactive-inscription.component.html',
  styles: [``],
})
export class ReactiveInscriptionComponent {

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
    favoriteColor: new FormControl(''),
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

  ngOnInit() {
    this.inscription.controls.favoriteColor.valueChanges.subscribe((value) => {
      console.log(value);
      if (value === 'purple') {
        this.languages.addValidators(mustHave2LanguagesValidator);
        this.languages.updateValueAndValidity();
        return
      }

      this.languages.updateValueAndValidity();
      this.languages.removeValidators(mustHave2LanguagesValidator);
    });
  }
}

const mustHave2LanguagesValidator: ValidatorFn = (control: AbstractControl) => {
  const array = control as FormArray;

  if (array.controls.length < 2) {
    return {mustHave2Languages: true};
  }
  return null;
}
