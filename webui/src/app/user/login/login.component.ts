import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthDataService } from 'src/app/services/auth-data.service';

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

  // loginForm!: FormGroup;
  constructor(
    // private authData: AuthDataService,
    // public dialogRef: MatDialogRef<LoginComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.authData.login(this.data.TK_TenDangNhap, this.data.TK_MatKhau).subscribe((data) => {
    //   if (Object.prototype.hasOwnProperty.call(data, 'error')) {
    //     // console.log('DialogLoginComponent: login: error', data);
    //   } else {
    //     this.data.token = data;
    //     // console.log('DialogLoginComponent: this.data', this.data);
    //     this.dialogRef.close({ data: this.data });
    //   }
    // },
    //   (error) => {
    //     console.log('AuthService: failed', error);
    //   });
  }

}
