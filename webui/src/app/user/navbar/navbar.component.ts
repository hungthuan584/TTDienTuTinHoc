import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

export interface ConfirmLogOutDialogData {
  confirmMessage: string;
  isLogOut: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  confirmMessage = 'Bạn muốn đăng xuất ?';
  isLogOut = false;

  constructor(
    private auth: AuthService,
    private taikhoan: TaiKhoanService,
    public dialog: MatDialog
  ) { }
  public data: any;
  private TK_TenDangNhap: any;

  ngOnInit(): void {
    // this.isLogin = this.auth.isLogin();
    // this.auth.getLoginName.subscribe(() => this.setLogin());
    // if (this.isLogin) {
    //   this.TK_TenDangNhap = this.auth.getInfo();
    //   this.taikhoan.getTaiKhoanByTenDangNhap(this.TK_TenDangNhap).subscribe((result) => {
    //     this.data = result;
    //   });
    // }
  }

  // setLogin() {
  //   this.isLogin = this.auth.isLogin();
  //   if (this.isLogin) {
  //     this.TK_TenDangNhap = this.auth.getInfo();
  //     this.taikhoan.getTaiKhoanByTenDangNhap(this.TK_TenDangNhap).subscribe((result) => {
  //       this.data = result;
  //     });
  //   }
  // }

  // showLogin() {
  //   this.auth.login('');
  //   this.isLogin = this.auth.isLogin();
  // }

  // logOut() {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: { confirmMessage: this.confirmMessage }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.isLogOut = result.data;
  //     if (this.isLogOut === true) {
  //       this.auth.logout();
  //       this.isLogin = false;
  //       window.location.reload();
  //     }
  //   });
  // }
}
