import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './account.component';
import { MustMatch } from '../../_helpers/must-match.validator';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  accountForm!: FormGroup;

  validationMessage: any = {
    TK_TenDangNhap: {
      require: 'Không được bỏ trống ',
      minlength: 'Không ít hơn 8 ký tự',
      maxlength: 'Không quá 20 ký tự',
    },
    TK_HoTen: {
      require: 'Không được bỏ trống ',
      minlength: 'Không ít hơn 5 ký tự',
    },
    TK_GioiTinh: {
      require: 'Không được bỏ trống ',
    },
    LV_Id: {
      require: 'Không được bỏ trống '
    },
    TK_MatKhau: {

    },
    TK_NhapLaiMatKhau: {

    },
    TK_SinhNhat: {

    },
    TK_Cmnd: {

    },
    TK_Sdt: {

    },
    TK_Email: {

    },
    TK_DiaChi: {

    }
  }



  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _taikhoanService: TaiKhoanService
  ) { }

  ngOnInit(): void {



    this.accountForm = this.fb.group({
      TK_TenDangNhap: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8)
        ]
      ],
      TK_HoTen: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      TK_GioiTinh: [
        '',
        Validators.required
      ],
      LV_Id: [
        '',
        Validators.required
      ],
      passwordGroup: this.fb.group(
        {
          TK_MatKhau: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20)
            ]
          ],
          TK_NhapLaiMatKhau: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20)
            ]
          ],
        },
        { validator: MustMatch('TK_MatKhau', 'TK_NhapLaiMatKhau') }
      ),
      TK_SinhNhat: [
        '',
        Validators.required
      ],
      TK_Cmnd: [
        '',
        Validators.required
      ],
      TK_Sdt: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/)
        ]
      ],
      TK_Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
        ]
      ],
      TK_DiaChi: [
        '',
        Validators.required
      ]
    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  saveClick(): void {
    if (this.accountForm.invalid) {
      return;
    }
    this.dialogRef.close();
  }

}
