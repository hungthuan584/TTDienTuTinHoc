import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(
    private auth: AuthService,
    private taikhoan: TaiKhoanService
  ) { }
  public isLogin = false;
  public data: any;
  private TK_TenDangNhap: any;

  ngOnInit(): void {
    this.isLogin = this.auth.isLogin();
    this.auth.getLoginName.subscribe(() => this.setLogin());
    if (this.isLogin) {
      this.TK_TenDangNhap = this.auth.getInfo();
      this.taikhoan.getTaiKhoanByTenDangNhap(this.TK_TenDangNhap).subscribe((result) => {
        console.log('result: ', result);
        this.data = result;
        console.log(this.data);
      });
    }
  }

  setLogin() {
    this.isLogin = this.auth.isLogin();
    if (this.isLogin) {
      this.TK_TenDangNhap = this.auth.getInfo();
      this.taikhoan.getTaiKhoanByTenDangNhap(this.TK_TenDangNhap).subscribe((result) => {
        this.data = result;
        console.log(this.data);
      });
    }
  }

  showLogin() {
    this.auth.login('');
    this.isLogin = this.auth.isLogin();
  }

  logOut() {
    this.auth.logout();
    this.isLogin = false;
  }

}
