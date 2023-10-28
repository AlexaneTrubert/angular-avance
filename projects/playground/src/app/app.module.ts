import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppInscriptionComponent} from './template-form/inscription.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BannedEmailDirective } from './banned-email.directive';
import {UniqueEmailValidator} from "./unique-email.directive";
import {ConfirmPasswordValidator} from "./confirm-password.directive";
import { ColorPickerComponent } from './color-picker.component';
import {ReactiveInscriptionComponent} from "./reactive-form/reactive-inscription.component";
import {AppComponent} from "./app.component";
import { RecipeComponent } from './RecipeComponent/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveInscriptionComponent,
    AppInscriptionComponent,
    BannedEmailDirective,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
