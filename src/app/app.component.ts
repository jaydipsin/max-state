import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { AutoLogin } from './auth/store/auth.action';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private authService: AuthService,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    this.store.dispatch(AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
