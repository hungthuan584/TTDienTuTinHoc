import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaiKhoanService {

  private REST_AIP_SERVER = 'http://localhost:3000/api/taikhoan';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  constructor(private httpClient: HttpClient) { }

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

  // ********** GET OBJECT **********
  public getByUsername(username: string): Observable<any> {

    const url = `${this.REST_AIP_SERVER}/thongtin/${username}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public changePassword(username: string, data: any): Observable<any> {

    const url = `${this.REST_AIP_SERVER}/change/${username}`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public lockAccount(username: string): Observable<any> {
    const url = `${this.REST_AIP_SERVER}/lock/${username}`;

    return this.httpClient.patch<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public unlockAccount(username: string): Observable<any> {
    const url = `${this.REST_AIP_SERVER}/unlock/${username}`;

    return this.httpClient.patch<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public resetPassword(username: string): Observable<any> {
    const url = `${this.REST_AIP_SERVER}/reset/${username}`;

    return this.httpClient.patch<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
}
