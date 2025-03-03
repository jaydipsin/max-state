import { createReducer, on } from '@ngrx/store';
import { AuthState, IUser } from 'src/app/modal';
import { User } from '../user.model';
import { LogInStart, LogInSuccess } from './auth.action';

export const InitialState: AuthState  = {
  user:null,
};

export const AuthReducer = createReducer(InitialState,
  on(LogInSuccess,((state,action)=>{
    console.log({...state});
    console.log(action.user);
    
  const user = new User(action.user.email,action.user.refreshToken,action.user.idToken,action.user.expiresIn)    
    return {
      ...state,
      user,
    }
  }))
);