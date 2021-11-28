import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import Swal from 'sweetalert2';
import { ProfileDialogData } from '../../header/header.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm!: FormGroup;

  validationMessages: any = {
    TK_MatKhauCu: {
      required: 'Nhập mật khẩu cũ'
    },
    TK_MatKhauMoi: {
      required: 'Nhập mật khẩu mới',
      maxLength: 'Mật khẩu không dài quá 20 ký tự',
      pattern: 'Mật khẩu phải hơn 8 ký tự bao gồm chữ thường, in hoa, số, ký tự đặc biệt'
    },
    TK_MatKhauNhapLai: {
      required: 'Nhập lại mật khẩu',
      mustMatch: 'Mật khẩu nhập lại chưa chính xác'
    },
  }

  formErrors: any = {};
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,

    private taikhoan: TaiKhoanService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      TK_MatKhauCu: ['', Validators.required],
      TK_MatKhauMoi: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      TK_MatKhauNhapLai: ['', Validators.required]
    }, {
      validator: MustMatch("TK_MatKhauMoi", "TK_MatKhauNhapLai")
    });

    this.passwordForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.passwordForm);
    });
  }

  logValidationErrors(group: FormGroup = this.passwordForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')
      ) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit() {
    var reqData = {
      TK_MatKhauCu: this.passwordForm.controls['TK_MatKhauCu'].value,
      TK_MatKhauMoi: this.passwordForm.controls['TK_MatKhauMoi'].value,
    }
    if (this.passwordForm.valid) {
      Swal.fire({
        title: 'Đổi mật khẩu?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.taikhoan.changePassword(this.data.id, reqData).subscribe(
              (res) => {
                console.log('Res: ', res);
                if (res.status == 1) {
                  Swal.fire({
                    title: 'Đổi mật khẩu',
                    icon: 'success',
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
                } else {
                  Swal.fire({
                    title: 'Lỗi!!',
                    icon: 'error',
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
