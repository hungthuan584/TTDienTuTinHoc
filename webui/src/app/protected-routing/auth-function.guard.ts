import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PhanQuyenService } from '../services/phan-quyen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFunctionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private phanquyen: PhanQuyenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
    return true;
  }

}
