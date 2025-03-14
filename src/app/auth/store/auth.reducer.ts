import { createReducer, on } from '@ngrx/store';
import { AuthState, IUser } from 'src/app/modal';
import { User } from '../user.model';
import {
  SignUpStart,
  LogInStart,
  AuthenticateSuccess,
  AuthenticateFail,
  ClearError,
  LogOutSuccess,
} from './auth.action';
import { state } from '@angular/animations';

export const InitialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
};

export const AuthReducer = createReducer(
  InitialState,
  on(SignUpStart, (state, action) => {
    return {
      ...state,
      authError: null,
      isLoading: true,
    };
  }),
  on(LogInStart, (state, action) => {
    return {
      ...state,
      authError: null,
      isLoading: true,
    };
  }),
  on(AuthenticateSuccess, (state, action) => {
    const user = new User(
      action.user.email,
      action.user.localId,
      action.user.Token,
      action.user.expiresIn
    );
    return {
      ...state,
      authError: null,
      isLoading: false,
      user,
    };
  }),
  on(AuthenticateFail, (state, action) => {
    return {
      ...state,
      authError: action.error,
      isLoading: false,
    };
  }),
  on(ClearError, (state, action) => {
    return {
      ...state,
      authError: null,
      isLoading: false,
    };
  }),
  on(LogOutSuccess, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);
