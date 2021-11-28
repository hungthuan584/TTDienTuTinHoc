import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { PhanQuyenService } from 'src/app/services/phan-quyen.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { image } from 'src/app/_helpers/image.const';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../profile/change-password/change-password.component';
import { ProfileComponent } from '../profile/profile.component';

export interface ProfileDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private nhanvien: NhanVienService,
    private phanquyen: PhanQuyenService,
    private image: HinhAnhService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  isFirst = this.tokenStorage.getReqChange();
  imageUrl: any;


  ngOnInit(): void {
    if (this.isFirst.includes('1')) {
      Swal.fire({
        icon: 'warning',
        title: 'Đổi mật khẩu?',
        text: 'Đây là lần đầu tiên đăng nhập. Đổi mật khẩu để bảo mật tốt hơn',
        showCancelButton: true,
        confirmButtonText: 'Đổi mật khẩu',
        confirmButtonColor: '#4cd137',
        cancelButtonText: 'Để sau',
        cancelButtonColor: '#e84118'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.dialog.open(
              ChangePasswordComponent,
              {
                data: {
                  title: 'Đổi mật khẩu',
                  id: this.loginAccount.TK_TenDangNhap
                },
                autoFocus: false,
                restoreFocus: false
              }
            ).afterClosed().subscribe(
              () => {
                window.location.reload();
              }
            );
          } else {
            this.tokenStorage.saveReqChange(0);
            window.location.reload();
          }
        }
      );
    }



    this.phanquyen.getByUsername(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.tokenStorage.savePermission(result);
      }
    );

    this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.currentUser = result;
        this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
      }
    );
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  profileClick() {
    this.dialog.open(
      ProfileComponent,
      {
        data: {
          title: 'Thông tin cá nhân',
          id: this.loginAccount.TK_TenDangNhap
        },
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
      icon: 'warning',
      title: 'Đăng xuất?',
      showCancelButton: true,
      confirmButtonColor: '#3498db',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Đăng xuất'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Đã đăng xuất',
            showConfirmButton: true
          }).then(
            () => {
              this.authService.signOut();
              this.router.navigate(['dang-nhap']);
            }
          );
        }
      }
    );
  }

}
