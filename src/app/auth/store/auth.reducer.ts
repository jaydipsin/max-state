import { createReducer, on } from '@ngrx/store';
import { AuthState, IUser } from 'src/app/modal';
import { User } from '../user.model';
import { LogInFail, LogInStart, LogInSuccess } from './auth.action';
import { state } from '@angular/animations';

export const InitialState: AuthState = {
  user: null,
  authError: null,
  isLoading :false
};

export const AuthReducer = createReducer(
  InitialState,
  on(LogInStart, (state, action) => {
    return {
      ...state,
      authError: null,
      isLoading:true
    };
  }),
  on(LogInSuccess, (state, action) => {
    const user = new User(
      action.user.email,
      action.user.localId,
      action.user.Token,
      action.user.expiresIn
    );
    return {
      ...state,
      user,
      authError: null,
      isLoading:false,
    };
  }),
  on(LogInFail, (state, action) => {
    return {
      ...state,
      authError: action.error,
      isLoading:false
    };
  })
);
