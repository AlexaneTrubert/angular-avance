import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {LoginComponent} from "./login.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class UserModule {}
