import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

export interface LoginDialogData {
  isDialog: any
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  confirmMessage = 'Bạn muốn đăng xuất ?';
  isLoggedIn = false;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }
  public data: any;

  ngOnInit(): void {

  }

  loginClick() {
    this.dialog.open(
      LoginComponent,
      {
        data: { isDialog: true },
        autoFocus: false,
        restoreFocus: false
      }
    );
  }
}
