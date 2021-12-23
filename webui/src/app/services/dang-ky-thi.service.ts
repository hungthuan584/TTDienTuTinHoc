import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DangKyThiService {

  private REST_API_SERVER = 'http://localhost:3000/api/dangkythi';
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

  public getByDotThi(dtId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/dotthi/${dtId}`;

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

  public getByHocVien(hvId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/hocvien/$${hvId}`;

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

  public getByChungChi(ccId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/chungchi/${ccId}`;

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
  public getAllHocVienDuThi(dtId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/danhsachduthi/${dtId}`;

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
  public getHocVienDuThiByCC(dtId: any, ccId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/danhsach/${dtId}/${ccId}`;

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

  public addMultiple(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/multiple`;

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

  public confirmByHV(hvId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/confirm/${hvId}`;

    return this.httpClient.patch<any>(url, this.httpOptions)
      .pipe(
        map(
          (data) => {
            return data;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  public confirmAuto(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/confirmAuto`;

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

  public deleteByHV(hvId: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/kythi/$${hvId}`;

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
