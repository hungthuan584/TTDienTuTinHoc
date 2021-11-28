import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
      if (state.url.includes('chungchitinhoc/ca-nhan')) {
        this.router.navigate(['chungchitinhoc']);
        return false;
      } else {
        this.router.navigate(['dang-nhap']);
        return false;
      }
    }
  }
}