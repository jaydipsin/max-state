import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/shopping-store/shopping-list.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effects';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot(AuthEffect),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains the last 25 states in memory
      logOnly: environment.production, // Restrict extension to log-only mode in production
    }),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
