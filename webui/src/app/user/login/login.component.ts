import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthDataService } from 'src/app/services/auth-data.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

export interface DialogData {
  TK_TenDangNhap: string;
  TK_MatKhau: string;
  token: string;
  status: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      TK_TenDangNhap: new FormControl('', [Validators.required]),
      TK_MatKhau: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (result) => {
          if (result.status == 1) {
            console.log(result);
            Swal.fire({
              icon: 'success',
              title: result.message,
              showConfirmButton: true
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: result.message,
              showConfirmButton: true
            });
          }

          localStorage.setItem('token', result.token.toString());

        },
        (err) => {

        }
      );
    }
  }

}
