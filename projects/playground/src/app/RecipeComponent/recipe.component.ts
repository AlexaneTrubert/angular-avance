import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent {
  recipe = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ingredients: new FormArray<FormGroup<{
        name: FormControl;
        quantity: FormControl;
      }>
    >([]),
  });

  addIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
      })
    );
  }

  get ingredients() {
    return this.recipe.controls.ingredients;
  }

  onSubmit() {
    if (this.recipe.invalid) {
      return;
    }

    console.log(this.recipe.value);
  }
}
