import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const STATUS_KEY = 'loginStatus';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'loginAccount';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    
  ) { }

  public saveStatus(status: any): void {
    window.sessionStorage.removeItem(STATUS_KEY);
    window.sessionStorage.setItem(STATUS_KEY, status);
  }

  public getStatus(): string {
    return sessionStorage.getItem(STATUS_KEY) || '0';
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '{null}';
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
