import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState, IUser } from 'src/app/modal';
import { LogInFail, LogInStart, LogInSuccess } from './auth.action';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from 'src/environments/credentials';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  logIn$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LogInStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
            { email: action.email, password: action.password }
          )
          .pipe(
            catchError((error) => {
              console.log('Error received:', error);
              return of(error); // Returning the error to the observable stream
            }),

            map((data) => {
              let user: IUser;
              if (data) {
                const expiresIn = new Date(
                  new Date().getTime() + +data.expiresIn * 1000
                );
                user = {
                  localId: data.localId,
                  email: data.email,
                  Token: data.idToken,
                  expiresIn: expiresIn,
                };
              }

              return LogInSuccess({ user });
            })
          );
      })
    );
  });


  redirectToHome$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(...[LogInSuccess]),
      tap(()=>{
        this._route.navigate(["/recipes"])
      })
    )
  },{dispatch:false})


  constructor(
    private action$: Actions,
    private store: Store,
    private http: HttpClient,
    private _route:Router
  ) {}
}
