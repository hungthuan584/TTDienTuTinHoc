import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.checkLogin() != false && this.authService.canAccess(state.url)) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Truy cập bị từ chối',
        text: 'Đăng nhập bằng tài khoản quản trị hoặc nhân viên?',
        showCancelButton: true,
        confirmButtonColor: '#0984e3',
        cancelButtonColor: '#e74c3c',
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Trang chủ'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.router.navigate(['dang-nhap']);
          } else {
            this.router.navigate(['chungchitinhoc']);
          }
        }
      )
      return false;
    }
  }
}