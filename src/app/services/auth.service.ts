import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Signup } from '../models/signup';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  private token: string | null = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;

  private loginStatusListener = new BehaviorSubject<boolean>(
    this.token ? true : false
  );

  private isLogged: boolean = localStorage.getItem('token') ? true : false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getToken() {
    return this.token;
  }

  getStatusListener() {
    return this.loginStatusListener.asObservable();
  }

  getIsLogged() {
    return this.isLogged;
  }

  composeUrl(action: string) {
    return `${this.apiUrl}/${action}`;
  }

  handleSignup(req: Signup) {
    this.http
      .post<{ message: string }>(this.composeUrl('signup'), req)
      .subscribe(() => {
        this.toastr.success('You have successfully signed up!');
        this.router.navigate(['/todos']);
      });
  }

  handleLogin(req: Login) {
    this.http
      .post<{
        token: string;
        expiresIn: number;
      }>(this.composeUrl('login'), req)
      .subscribe(response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        setTimeout(() => {
          this.handleLogout();
        }, response.expiresIn * 1000);
        this.loginStatusListener.next(true);
        this.isLogged = true;
        this.toastr.success('Welcome back');
        this.router.navigate(['/todos']);
      });
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.http
      .get<{ message: string }>(this.composeUrl('logout'))
      .subscribe(() => {
        this.token = null;
        this.loginStatusListener.next(false);
        this.isLogged = false;
        this.toastr.success('Bye, see you later:)');
        this.router.navigate(['/home']);
      });
  }
}
