import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HinhAnhService {
  private REST_AIP_SERVER = 'http://localhost:3000/api/images';
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

  public changeAvatar(data: any): Observable<any> {

    const url = `${this.REST_AIP_SERVER}`;

    return this.httpClient.post(url, JSON.stringify(data), this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getAvatar(filename: any): string {
    if (!filename || filename == undefined || filename == '') {
      return `${this.REST_AIP_SERVER}/default_avatar.png`;
    } else {
      return `${this.REST_AIP_SERVER}/${filename}`;
    }
  }
}
