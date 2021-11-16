import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PhanQuyenService } from './phan-quyen.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_AIP_SERVER = 'http://localhost:3000/api/taikhoan';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private phanquyen: PhanQuyenService
  ) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  public login(dataLogin: any): Observable<any> {
    const url = `${this.REST_AIP_SERVER}/login`;

    return this.httpClient.post<any>(url, dataLogin, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public checkLogin(): boolean {
    const helper = new JwtHelperService();

    if (this.tokenStorage.getToken().includes('{null}')) {
      return false;
    } else {
      var tokenExpired = helper.isTokenExpired(this.tokenStorage.getToken());

      if (this.tokenStorage.getToken() !== null && tokenExpired == true) {
        return false;
      } else {
        return true;
      }
    }
  }

  public canAccess(url: string) {
    var user = this.tokenStorage.getUser();
    if (url.includes('quantrihethong') && user.Q_Id <= 2) {
      return true;
    } else {
      return false;
    }
  }

  public checkRoles(loginUser: any) {
    var user = this.tokenStorage.getUser();

    this.phanquyen.checkPermission(user.TK_TenDangNhap, 1);
  }
}
