import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/modal';
import { LogInStart, LogInSuccess } from './auth.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from 'src/environments/credentials';
import { Injectable } from '@angular/core';





@Injectable()
export class AuthEffect {
  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LogInStart),
      switchMap((action) => {
        return this.http.post<AuthResponseData>(
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true,
          }
        ).pipe(catchError(err=>
            of(err),
        ),map(data => {
            let user;
            if (data) {
                const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
                user = {
                    localId: data.localId,
                    email: data.email,
                    Token: data.token,
                    expiresIn: expirationDate,
                }
            }
            return LogInSuccess({user})
        }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private authService: AuthService,
    private http: HttpClient
  ) {}
}
