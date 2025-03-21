import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { recipeSelector } from '../store/recipe.select';
import { IAppState } from 'src/app/modal';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSubject = new BehaviorSubject<Recipe[]>(this.recipeService.getRecipes());
  recipes$ = this.recipeSubject.asObservable()
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        const data = JSON.parse(localStorage.getItem('recipes'));
        if (data) {
          this.recipeSubject.next(data);
        }
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
