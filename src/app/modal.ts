import { User } from './auth/user.model';
import { Ingredient } from './shared/ingredient.model';

export interface IAppState {
  shoppingList: IShoppingListState;
  auth: AuthState;
}

export interface IUser {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: Date;
}

export interface IShoppingListState {
  ingredients: Ingredient[];
  editIngredient: Ingredient | null;
  editIngredientIndex: number;
}

export interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}



export interface AuthState {
  user: User | null;
}

