import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { LoginDialogData } from '../user/navbar/navbar.component';
import { randomCode } from '../_helpers/makeCode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  code: any;

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
      TK_MatKhau: ['u$erCit@2021', Validators.required],
      MaAnToan: ['', Validators.required]
    });

    this.code = randomCode(6);
  }

  submit(): void {
    if (this.loginForm.valid && this.loginForm.controls['MaAnToan'].value == this.code) {
      this.taikhoan.login(this.loginForm.value).subscribe(
        (result) => {
          if (result.isLoggedIn == 1) {
            Swal.fire({
              icon: 'success',
              title: 'Đăng nhập thành công',
              showConfirmButton: true
            }).then(
              () => {
                this.tokenStorage.saveStatus(result.isLoggedIn);
                this.tokenStorage.saveToken(result.token);
                this.tokenStorage.saveUser(result.loginAccount);
                if (result.loginAccount.TK_NumberOfLogin == 0) {
                  this.tokenStorage.saveReqChange(1);
                } else {
                  this.tokenStorage.saveReqChange(0);
                }
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
                this.loginForm.controls['MaAnToan'].setValue('');
                this.code = randomCode(6);
              }
            );
          }
        }
      )
    } else {
      if (!this.loginForm.valid) {
        Swal.fire({
          icon: 'error',
          title: 'Nhập tất cả các trường',
          showConfirmButton: true
        }).then(
          () => {
            this.loginForm.controls['MaAnToan'].setValue('');
            this.code = randomCode(6);
          }
        );
      } else {
        if (this.loginForm.controls['MaAnToan'].value != this.code) {
          Swal.fire({
            icon: 'error',
            title: 'Sai mã an toàn',
            showConfirmButton: true
          }).then(
            () => {
              this.loginForm.controls['MaAnToan'].setValue('');
              this.code = randomCode(6);
            }
          );
        }
      }
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
