import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import Swal from 'sweetalert2';
import { ProfileDialogData } from '../../header/header.component';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {

  infoForm!: FormGroup;
  validationMessages: any = {
    NV_HoTen: {
      required: 'Nhập đầy đủ họ tên',
      maxlength: 'Họ tên không được quá dài',
      minlength: 'Họ tên không được quá ngắn'
    },
    NV_GioiTinh: {
      required: 'Chọn giới tính'
    },
    NV_NgaySinh: {
      required: 'Nhập ngày sinh'
    },
    NV_DiaChi: {
      required: 'Nhập địa chỉ',
      maxlength: 'Địa chỉ không được quá dài',
      minlength: 'Ghi rõ địa chỉ liên lạc: số hẻm/số nhà + tên đường + xã/phường + quận/huyện + tỉnh/thành phố'
    },
    NV_Sdt: {
      required: 'Nhập số điện thoại',
      pattern: 'Số điện thoại không đúng'
    },
    NV_Email: {
      required: 'Nhập email',
      email: 'Email không đúng',
      maxlength: 'Email không được quá dài',
      minlength: 'Email không được quá ngắn'
    }
  };

  formErrors: any = {};
  constructor(
    public dialogRef: MatDialogRef<ChangeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,

    private fb: FormBuilder,
    private nhanvien: NhanVienService
  ) { }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      NV_HoTen: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      NV_GioiTinh: ['', Validators.required],
      NV_NgaySinh: ['', Validators.required],
      NV_DiaChi: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      NV_Sdt: ['', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      NV_Email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
    });

    this.nhanvien.getById(this.data.id).subscribe(
      (result) => {
        this.setValueForm(result);
      }
    );

    this.infoForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.infoForm);
    });
  }

  setValueForm(data: any) {
    this.infoForm.controls['NV_HoTen'].setValue(data.NV_HoTen);
    this.infoForm.controls['NV_GioiTinh'].setValue(data.NV_GioiTinh);
    this.infoForm.controls['NV_NgaySinh'].setValue(moment(data.NV_NgaySinh).format('YYYY-MM-DD'));
    this.infoForm.controls['NV_DiaChi'].setValue(data.NV_DiaChi);
    this.infoForm.controls['NV_Sdt'].setValue(data.NV_Sdt);
    this.infoForm.controls['NV_Email'].setValue(data.NV_Email);
  }

  logValidationErrors(group: FormGroup = this.infoForm): void {
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
    if (this.infoForm.valid) {
      Swal.fire({
        title: 'Lưu thông tin',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.nhanvien.changeInfo(this.data.id, this.infoForm.value).subscribe(
              (res) => {
                if (res.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thay đổi thông tin'
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
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
