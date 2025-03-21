import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../modal';
import { LogOutSuccess } from '../auth/store/auth.action';
import { fetchRecipeAction, setRecipesAction, storeRecipeAction } from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store:Store<IAppState>,
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.store.dispatch(storeRecipeAction())
    console.log("test");
    
  }

  onFetchData() {
    this.store.dispatch(fetchRecipeAction())
  }

  onLogout() {
    this.store.dispatch(LogOutSuccess())
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
