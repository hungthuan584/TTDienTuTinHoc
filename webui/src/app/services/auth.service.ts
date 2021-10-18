import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { LoginComponent } from '../user/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getLoginName = new Subject();
  public LV_Id = 4;
  public isLog = true;
  public anyToken: any;

  constructor(private router: Router, public dialog: MatDialog) { }

  public setToken(token: any) {
    if (!token) {
      this.removeToken();
    }
    localStorage.setItem('token', token);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.LV_Id = decodedToken.result.LV_Id;
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getInfo() {
    const helper = new JwtHelperService();
    this.anyToken = this.getToken();
    const decodedToken = helper.decodeToken(this.anyToken);
    return decodedToken.result.TK_TenDangNhap;
  }

  public isLogin(): boolean {
    const helper = new JwtHelperService();
    this.anyToken = this.getToken();
    var tokenExpired = helper.isTokenExpired(this.anyToken);

    if (this.anyToken != null && tokenExpired == true) return false;
    return this.anyToken != null;
  }

  public canAccess(url: any) {
    const helper = new JwtHelperService();
    this.anyToken = this.getToken();
    const decodedToken = helper.decodeToken(this.anyToken);
    this.LV_Id = decodedToken.result.LV_Id;
    if (url.includes('quantrihethong') && this.LV_Id < 3) {
      return true;
    }

    const page = url.toString().substr(1);
    console.log('Bạn không thể vào trang ' + page);
    return false;
  }

  public logout() {
    this.removeToken();
    this.router.navigate(['']);
  }

  public login(backUrl: string): void {
    this.openDialog(backUrl);
  }

  private openDialog(backUrl: string): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      data: { TK_TenDangNhap: '', TK_MatKhau: '', token: '', status: this.isLog },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const TK_TenDangNhap = result?.data?.TK_TenDangNhap;
      const TK_MatKhau = result?.data?.TK_MatKhau;
      const token = result?.data?.token;

      if (token?.status == 0 && token?.message == "Invalid username or password") {
        this.isLog = false;
        this.login(backUrl);
      } else if (!!TK_TenDangNhap && !!TK_MatKhau && !!token) {
        this.isLog = true;
        this.setToken(token.token);
        this.getLoginName.next();
        this.router.navigate([backUrl]);
      }
    });
  }
}
