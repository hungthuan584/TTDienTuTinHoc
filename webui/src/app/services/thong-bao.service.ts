import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThongBaoService {

  private REST_API_SERVER = 'http://localhost:3000/api/thongbao';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  public getAll(): Observable<any> {

    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getById(id: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/thongtin/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getByLopHoc(lhId: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/lophoc/${lhId}`;

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

  public updateById(id: any, data: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.put<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
  public deleteById(id: any): Observable<any> {

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
