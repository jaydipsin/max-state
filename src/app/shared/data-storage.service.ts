import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { IAppState } from '../modal';
import { Store } from '@ngrx/store';
import { setRecipesAction } from '../recipes/store/recipe.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  updatedStorage(name:string,Objindex:number){
   let storage = JSON.parse(localStorage.getItem(name));
   let updatedStorageData;
   if (storage) {
    updatedStorageData = storage.filter((data,index)=> index !== Objindex);  
   }
   updatedStorageData = []
  }

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

}
