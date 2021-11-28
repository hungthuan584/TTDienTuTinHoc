import { Injectable } from '@angular/core';

const STATUS_KEY = 'loginStatus';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'loginAccount';
const PERS_KEY = 'listPers';
const REQCHANGE_KEY = 'requestChangePassword';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(

  ) { }

  public saveReqChange(isFirst: any): void {
    window.sessionStorage.removeItem(REQCHANGE_KEY);
    window.sessionStorage.setItem(REQCHANGE_KEY, isFirst);
  }

  public getReqChange(): string {
    return sessionStorage.getItem(REQCHANGE_KEY) || '0';
  }

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

  public savePermission(pers: any): any {
    window.sessionStorage.removeItem(PERS_KEY);
    window.sessionStorage.setItem(PERS_KEY, JSON.stringify(pers));
  }

  public getPermission(): any {

    const pers = window.sessionStorage.getItem(PERS_KEY);
    if (pers) {
      return JSON.parse(pers);
    }
    return {};
  }
}
