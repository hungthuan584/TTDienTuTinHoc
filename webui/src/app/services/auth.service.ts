import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';

const REST_API_SERVER = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: any): Observable<any> {
    return this.httpClient.post(REST_API_SERVER + 'login', {
      username: credentials.TK_TenDangNhap,
      password: credentials.TK_MatKhau
    }, httpOptions);
  }
}
