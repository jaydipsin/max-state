import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { API_KEY } from 'src/environments/credentials';
import { Store } from '@ngrx/store';
import { IAppState, IUser } from '../modal';
import { AuthenticateSuccess, LogOutSuccess } from './store/auth.action';
import { tick } from '@angular/core/testing';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  // logout() {
  //   if (this.tokenExpirationTimer) {
  //     console.log("test");

  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(LogOutSuccess());
    }, expirationDuration);
  }

  clareLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   const userOb: IUser = {
  //     email,
  //     localId: userId,
  //     Token: token,
  //     expiresIn: expirationDate,
  //   };
  //   this.store.dispatch(AuthenticateSuccess({ user: userOb }));
  //   // this.user.next(user);
  //   this.setLogoutTimer(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }
}
