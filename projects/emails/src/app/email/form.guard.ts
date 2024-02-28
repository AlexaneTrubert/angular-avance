import {EmailCreationComponent} from "./email-creation.component";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

export class FormGuard implements CanDeactivate<EmailCreationComponent> {
  canDeactivate(component: EmailCreationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean {
    if(component.isFormTouched()) {
      return window.confirm('Voulez-vous vraiment quitter cette page ?');
    }

    return true;
  }
}
