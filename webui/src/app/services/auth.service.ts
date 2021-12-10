import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
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
    private tokenStorage: TokenStorageService
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
    window.location.reload();
  }

  public checkLogin(): boolean {
    const helper = new JwtHelperService();

    if (this.tokenStorage.getToken().includes('{null}')) {
      return false;
    } else {
      var tokenExpired = helper.isTokenExpired(this.tokenStorage.getToken());
      if (this.tokenStorage.getToken() !== null && tokenExpired == true) {
        Swal.fire({
          icon: 'info',
          title: 'Hết hạn đăng nhập'
        }).then(
          () => {
            this.signOut();
          }
        );
        return false;
      } else {
        return true;
      }
    }
  }

  public canAccess(url: string) {
    var user = this.tokenStorage.getUser();
    if ((url.includes('quantrihethong') && user.Q_Id <= 2) ||
      (url.includes('quanlylophoc') && user.Q_Id == 3) ||
      (url.includes('chungchitinhoc') && user.Q_Id == 4)) {
      return true;
    } else {
      return false;
    }
  }

  public childrenAccess(url: string) {
    var user = this.tokenStorage.getUser();
    if (url.includes('ca-nhan') && user.Q_Id != 4) {
      return false;
    } else {
      return true;
    }
  }

  public isUser(username: any, qId: any) {
    var user = this.tokenStorage.getUser();
    if (user.TK_TenDangNhap == username || user.Q_Id > qId) {
      return true;
    } else {
      return false;
    }
  }
}
