import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { LoginDialogData } from '../user/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,

    private taikhoan: TaiKhoanService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      TK_TenDangNhap: ['', Validators.required],
      TK_MatKhau: ['u$erCit@2021', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      console.log('Data: ', this.loginForm.value);
      this.taikhoan.login(this.loginForm.value).subscribe(
        (result) => {
          if (result.isLoggedIn == 1) {
            Swal.fire({
              icon: 'success',
              title: result.message,
              showConfirmButton: true
            }).then(
              () => {
                console.log('Result: ', result);
                this.tokenStorage.saveStatus(result.isLoggedIn);
                this.tokenStorage.saveToken(result.token);
                this.tokenStorage.saveUser(result.loginAccount)
                if (result.loginAccount.Q_Id <= 2) {
                  if (this.data.isDialog) {
                    this.router.navigate(['quantrihethong']);
                    this.dialogRef.close();
                  } else {
                    this.router.navigate(['quantrihethong']);
                  }
                } else {
                  this.router.navigate(['chungchitinhoc']);
                  this.dialogRef.close();
                }
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: result.message,
              showConfirmButton: true
            }).then(
              () => {
                window.sessionStorage.clear();
                window.location.reload();
              }
            );
          }
        }
      )
    }

  }

  exitClick() {
    if (this.data.isDialog) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['chungchitinhoc']);
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
