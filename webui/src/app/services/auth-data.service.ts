import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  private REST_API_SERVER = 'http://localhost:3000/api/taikhoan/login';
  constructor(private httpClient: HttpClient) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  public login(username: string, password: string): Observable<any> {
    const httpParams = new HttpParams();
    const loginData = { TK_TenDangNhap: username, TK_MatKhau: password };

    return (
      this.httpClient.post(this.REST_API_SERVER, loginData, {
        params: httpParams,
      }).pipe(catchError(this.handleError))
    );
  }
}
