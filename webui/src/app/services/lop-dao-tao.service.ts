import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LopDaoTaoService {

  private REST_API_SERVER = 'http://localhost:3000/api/lopdaotao';
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

  public getAllLLopDaoTao(): Observable<any> {
    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getLopDaoTaoById(id: string): Observable<any> {

    const url = `${this.REST_API_SERVER}/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public addLopDaoTao(LopDaoTaoReqData: any): Observable<any> {

    const url = `${this.REST_API_SERVER}`;

    return this.httpClient.post<any>(url, LopDaoTaoReqData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public updateLopDaoTao(id: string, LopDaoTaoReqData: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/${id}`;
    return this.httpClient.put<any>(url, LopDaoTaoReqData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public deleteLopDaoTao(id: string): Observable<any> {

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