import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LopHocService {

  private REST_API_SERVER = 'http://localhost:3000/api/lophoc';
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

  public getOpening(): Observable<any> {
    const url = `${this.REST_API_SERVER}/opening`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
  public getCompleted(): Observable<any> {
    const url = `${this.REST_API_SERVER}/completed`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getById(id: string): Observable<any> {

    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public addNew(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public updateById(id: string, data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.put<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public deActivate(id: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.patch<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public isComplete(id: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.delete<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

}
