import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  AddIngredientAction,
  DeleteIngredientAction,
  StartEditAction,
  StopEditAction,
  UpdateIngredient,
} from '../shopping-store/shopping-list.action';
import { IAppState } from 'src/app/modal';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe({
      next: (data) => {
        console.log(data);

        if (data.editIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = data.editIngredient;
          this.editedItemIndex = data.editIngredientIndex;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          console.log((this.editedItem = data.editIngredient));
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(UpdateIngredient({ingredient:newIngredient}))

    } else {
      this.store.dispatch(AddIngredientAction({ingredient:newIngredient}))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(StopEditAction());
  }

  onDelete() {
    this.store.dispatch(DeleteIngredientAction());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(StopEditAction());
  }
}
