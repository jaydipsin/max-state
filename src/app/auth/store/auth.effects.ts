import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState, IAuthResponseData, IUser } from 'src/app/modal';
import {
  SignUpStart,
  LogInStart,
  AuthenticateSuccess,
  AuthenticateFail,
  LogOutSuccess,
  AutoLogin,
} from './auth.action';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_KEY } from 'src/environments/credentials';
import { inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../user.model';

@Injectable()
export class AuthEffect {


    authServices = inject(AuthService)



  private handelAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expires: number
  ) {
    const expiresIn = new Date(new Date().getTime() + expires * 1000);
    const userStore = new User(email, localId, idToken, expiresIn);
    const user: IUser = {
      localId: localId,
      email: email,
      Token: idToken,
      expiresIn: expiresIn,
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.store.dispatch(AuthenticateSuccess({ user }));
    return user;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessages = {
      EMAIL_EXISTS: 'This email already exist',
      EMAIL_NOT_FOUND: 'Email not found',
      INVALID_PASSWORD: 'Incorrect password',
    };
    let errorMessage = errorRes.error.error.message;
    return AuthenticateFail({
      error: errorMessages[errorMessage] || 'An error occurred',
    });
  }

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AutoLogin),
      map((data) => {
        let userData: IUser;
        if (data) {
          userData = JSON.parse(localStorage.getItem('user'));
        } else {
          console.log('test');
          return { type: 'Dummy' };
        }
        console.log(userData);
        
        const loadedUser = new User(
          userData.email,
          userData.localId,
          userData.Token,
          userData.expiresIn
        );
        
        if (loadedUser.token) {
          const user = {
            email: loadedUser.email,
            localId: loadedUser.id,
            Token: loadedUser.token,
            expiresIn: new Date(userData.expiresIn),
          };

          return AuthenticateSuccess({ user });
          // this.user.next(loadedUser);
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
        }
        console.log('test');

        return { type: 'DUMMY' };
      })
    );
  });

  singUp$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SignUpStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((data) => {
              let user: IUser;
              if (data) {
                user = this.handelAuthentication(
                  data.localId,
                  data.email,
                  data.idToken,
                  +data.expiresIn
                );
              }
              return AuthenticateSuccess({ user });
            }),
            catchError((error) => {
              return of(this.handleError(error));
            })
          );
      })
    );
  });

  logIn$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LogInStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((data) => {
              let user: IUser;
              if (data) {
                localStorage.setItem('user', JSON.stringify(data));
                user = this.handelAuthentication(
                  data.email,
                  data.localId,
                  data.idToken,
                  +data.expiresIn
                );
              }
              return AuthenticateSuccess({ user });
            }),
            catchError((error) => {
              return of(this.handleError(error)); // Returning the error to the observable stream
            })
          );
      })
    );
  });

  logOut$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LogOutSuccess),
        tap(() => {
          this.authServices.clareLogoutTimer();
          localStorage.removeItem('user');
        })
      );
    },
    { dispatch: false }
  );

  redirectToHome$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthenticateSuccess),
        tap((data) => {
          if (data) {
            console.log('test');

            this._route.navigate(['/recipes']);
          }
        })
      );
    },
    { dispatch: false }
  );

  redirectToAuth$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LogOutSuccess),
        tap(() => {
          this._route.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private action$: Actions,
    private store: Store,
    private http: HttpClient,
    private _route: Router
  ) {}
}
