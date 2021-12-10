import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFunctionGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.checkPermission(route)) {
      Swal.fire({
        icon: 'error',
        title: 'Không có quyền truy cập'
      }).then(
        () => {
          this.router.navigate(['quantrihethong/trang-chu']);
        }
      );
      return false;
    }
    return true;
  }

  checkPermission(route: ActivatedRouteSnapshot) {
    var functionId = route.data.functionId;

    var listPers = this.tokenStorage.getPermission();
    for (let per of listPers) {
      if (per.CN_Id == functionId) {
        return true;
      }
    }
    return false;
  }


}
