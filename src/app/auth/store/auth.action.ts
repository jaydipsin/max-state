import { createAction, props } from '@ngrx/store';
import { IAuthResponseData, IUser } from 'src/app/modal';
import { User } from '../user.model';

const LOGIN_START = '[AUTH] login start';
const LOGIN_SUCCESS = '[AUTH] login success';
const LOGIN_FAIL = '[AUTH] login fail';

const LOGOUT_SUCCESS = '[AUTH] log out success';

const SINGUP_START = '[AUTH] sing-up start';
const SINGUP_SUCCESS = '[AUTH] sing-up success';
const SINGUP_FAIL = '[AUTH] sing-up fail';

export const LogInStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const LogInSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: IUser }>()
);
export const LogInFail = createAction(LOGIN_FAIL,props<{error:string}>());

export const LogOutSuccess = createAction(
  LOGOUT_SUCCESS,
  props<{ user: null }>()
);
