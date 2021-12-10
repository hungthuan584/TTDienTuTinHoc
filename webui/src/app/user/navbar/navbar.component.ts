import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { image } from 'src/app/_helpers/image.const';
import Swal from 'sweetalert2';

export interface LoginDialogData {
  isDialog: any
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hocvien: HocVienService,
    private authService: AuthService,
    private image: HinhAnhService
  ) { }

  public data: any;
  loginStatus: any;
  loginAccount = this.tokenStorage.getUser();
  currentUser: any;
  imageUrl: any;

  ngOnInit(): void {
    if (this.tokenStorage.getStatus().includes('0')) {
      this.loginStatus = false;
    } else {
      if (this.loginAccount.Q_Id != 4) {
        window.sessionStorage.clear();
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
        this.hocvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
          (result: any) => {
            this.currentUser = result;
            this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
          }
        );
      }
    }
  }

  loginClick() {
    this.dialog.open(
      LoginComponent,
      {
        data: { isDialog: true },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  logoutClick() {
    Swal.fire({
      icon: 'question',
      title: 'Đăng xuất?',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Huỷ',
      showCancelButton: true,
      confirmButtonColor: '#eb2f06',
      cancelButtonColor: '#a4b0be'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.authService.signOut();
        }
      }
    );
  }
}
