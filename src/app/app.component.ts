import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo';
  authSubject$!: Subscription;
  isLogged!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLogged();
    this.authSubject$ = this.authService.getStatusListener().subscribe(val => {
      this.isLogged = val;
    });
  }

  ngOnDestroy(): void {
    this.authSubject$.unsubscribe();
  }

  logout(): void {
    this.authService.handleLogout();
  }
}
