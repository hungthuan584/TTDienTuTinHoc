import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './account.component';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  accountForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.accountForm = this.fb.group({
      TK_TenDangNhap: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
      TK_HoTen: ['', [Validators.required, Validators.minLength(5)]],
      TK_GioiTinh: ['', Validators.required],
      LV_Id: ['', Validators.required],
      TK_MatKhau: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      TK_NhapLaiMatKhau: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      TK_SinhNhat: ['', Validators.required],
      TK_Cmnd: ['', Validators.required],
      TK_Sdt: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      TK_Email: ['', [Validators.required, Validators.email]],
      TK_DiaChi: ['', Validators.required]
    },
      {
        validator: MustMatch('TK_MatKhau', 'TK_NhapLaiMatKhau')
      });

  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  saveClick(): void {
    this.dialogRef.close();
  }

}
