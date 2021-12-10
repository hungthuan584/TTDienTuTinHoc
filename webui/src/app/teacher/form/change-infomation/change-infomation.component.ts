import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { dialogData } from '../../classroom/classroom.component';

@Component({
  selector: 'app-change-infomation',
  templateUrl: './change-infomation.component.html',
  styleUrls: ['./change-infomation.component.scss']
})
export class ChangeInfomationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeInfomationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,

    private tokenStorage: TokenStorageService,
    private giaovien: GiaoVienService,
    private fb: FormBuilder
  ) { }

  loginAccount = this.tokenStorage.getUser();
  teacherForm!: FormGroup;
  validationMessages: any = {
    GV_HoTen: {
      required: 'Nhập đầy đủ họ tên',
    },
    GV_GioiTinh: {
      required: 'Chọn giới tính'
    },
    GV_NgaySinh: {
      required: 'Nhập ngày sinh'
    },
    GV_DiaChi: {
      required: 'Nhập địa chỉ',
      maxlength: 'Địa chỉ không được quá dài',
      minlength: 'Ghi rõ địa chỉ liên lạc: số hẻm/số nhà + tên đường + xã/phường + quận/huyện + tỉnh/thành phố'
    },
    GV_Sdt: {
      required: 'Nhập số điện thoại',
      pattern: 'Số điện thoại không đúng'
    },
    GV_Email: {
      required: 'Nhập email',
      email: 'Email không đúng',
    },
  };

  formErrors: any = {};

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      GV_HoTen: ['', [Validators.required]],
      GV_GioiTinh: ['', Validators.required],
      GV_NgaySinh: ['', Validators.required],
      GV_DiaChi: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      GV_Sdt: ['', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      GV_Email: ['', [Validators.required, Validators.email]],
    });

    this.giaovien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.setValueForm(result);
      }
    );

    this.teacherForm.valueChanges.subscribe((data: any) => {
      this.logValidationErrors(this.teacherForm);
    });
  }

  setValueForm(data: any) {
    this.teacherForm.controls['GV_HoTen'].setValue(data.GV_HoTen);
    this.teacherForm.controls['GV_GioiTinh'].setValue(data.GV_GioiTinh);
    this.teacherForm.controls['GV_NgaySinh'].setValue(moment(data.GV_NgaySinh).format('YYYY-MM-DD'));
    this.teacherForm.controls['GV_DiaChi'].setValue(data.GV_DiaChi);
    this.teacherForm.controls['GV_Sdt'].setValue(data.GV_Sdt);
    this.teacherForm.controls['GV_Email'].setValue(data.GV_Email);
  }

  logValidationErrors(group: FormGroup = this.teacherForm): void {
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
    if (this.teacherForm.valid) {
      Swal.fire({
        title: 'Sửa thông tin?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cập nhật'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.giaovien.changeInfo(this.loginAccount.TK_TenDangNhap, this.teacherForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Sửa đổi thành công'
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!'
                  }).then(
                    () => {
                      this.ngOnInit();
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Nhập đầy đủ tất cả các trường'
      }).then(
        () => {
          this.ngOnInit();
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
