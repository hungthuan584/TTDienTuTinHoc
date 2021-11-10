import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private taikhoan: TaiKhoanService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      TK_TenDangNhap: ['', Validators.required],
      TK_MatKhau: ['', Validators.required]
    });
  }
  submit(): void {
    if (this.loginForm.valid) {
      console.log('Login data: ', this.loginForm.value);
      this.taikhoan.login(this.loginForm.value).subscribe(
        (result) => {
          
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
