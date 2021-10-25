import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private taikhoan: TaiKhoanService
  ) { }

  public isLogin = false;
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

  setLogin() {
    // this.isLogin = this.auth.isLogin();
    // if (this.isLogin) {
    //   this.TK_TenDangNhap = this.auth.getInfo();
    //   this.taikhoan.getTaiKhoanByTenDangNhap(this.TK_TenDangNhap).subscribe((result) => {
    //     this.data = result;
    //   });
    // }
  }


}
