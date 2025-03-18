import { createAction, props } from '@ngrx/store';
import { IAuthResponseData, IUser } from 'src/app/modal';
import { User } from '../user.model';

const LOGIN_START = '[AUTH] login start';
const SIGNUP_START = '[AUTH] sing-up start';
const AUTHENTICATE_SUCCESS = '[AUTH] auth success';
const AUTHENTICATE_FAIL = '[AUTH] auth fail';
const CLEAR_ERROR = '[AUTH] cancel error';
const LOGOUT_SUCCESS = '[AUTH] log out success';
const AUTO_LOGIN = '[AUTH] AUTO LOGIN ';

export const AutoLogin = createAction(AUTO_LOGIN);

export const SignUpStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string; }>()
);
export const LogInStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const AuthenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{ user: IUser,redirect: boolean }>()
);
export const AuthenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ error: string }>()
);

export const LogOutSuccess = createAction(LOGOUT_SUCCESS);

export const ClearError = createAction(CLEAR_ERROR);
