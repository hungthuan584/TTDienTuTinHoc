import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThongKeService {
  private REST_API_SERVER = 'http://localhost:3000/api/thongke';
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

  public getByLopHoc(data: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/lophoc`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
  
  public getByHocVien(data: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/hocvien`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getByGiaoVien(data: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/giaovien`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
  public getByKhoaThi(data: any): Observable<any> {

    const url = `${this.REST_API_SERVER}/khoathi`;

    return this.httpClient.post<any>(url, data, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }
}
