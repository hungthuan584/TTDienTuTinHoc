import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaiVietService {
  private REST_API_SERVER = 'http://localhost:3000/api/baiviet';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getFile(filename: any): string {
    return `http://localhost:3000/api/baiviet/files/${filename}`;
  }

  public getNew(): Observable<any> {
    const url = `${this.REST_API_SERVER}/new`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }
  public getAll(): Observable<any> {
    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  public getById(id: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/thongtin/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  public addNew(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  public updateById(id: any, data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.put<any>(url, data, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  public deleteById(id: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.delete<any>(url, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }
}
