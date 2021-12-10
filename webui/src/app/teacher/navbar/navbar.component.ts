import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private giaovien: GiaoVienService,
    private image: HinhAnhService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  loginUser: any;
  imageUrl: any;

  ngOnInit(): void {
    this.giaovien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.loginUser = result;
        this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
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
