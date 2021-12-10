import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RootAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.checkLogin() != false && this.loginAccount.Q_Id == 0) {
      return true;
    } else {
      Swal.fire({
        title: 'Không có quyền truy cập',
        icon: 'error'
      }).then(
        () => {
          this.router.navigate(['quantrihethong']);
        }
      );
      return false;
    }
  }

}
