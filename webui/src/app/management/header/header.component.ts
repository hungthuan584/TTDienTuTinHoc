import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private authService: AuthService,
    private nhanvien: NhanVienService
  ) { }

  ngOnInit(): void {
    var loginUser = this.tokenStorage.getUser();
    this.nhanvien.getById(loginUser.TK_TenDangNhap).subscribe(
      (result) => {
        this.currentUser = result;
        console.log('User:', this.currentUser);
      }
    );
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
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
