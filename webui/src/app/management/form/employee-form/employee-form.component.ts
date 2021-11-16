import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ChucVuService } from 'src/app/services/chuc-vu.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import Swal from 'sweetalert2';
import { employeeDialogData } from '../../employee/employee.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  dsChucVu: any;

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
    },
    CV_Id: {
      required: 'Chọn chức vụ'
    },
  };

  formErrors: any = {};

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: employeeDialogData,

    private nhanvien: NhanVienService,
    private chucvu: ChucVuService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      NV_HoTen: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      NV_GioiTinh: ['', Validators.required],
      NV_NgaySinh: ['', Validators.required],
      NV_DiaChi: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      NV_Sdt: ['', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      NV_Email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      CV_Id: ['', [Validators.required]],
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.chucvu.getAll().subscribe(
      (result) => {
        this.dsChucVu = result;
      }
    );

    if (this.data.id) {
      this.nhanvien.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }
  }

  setValueForm(data: any) {
    this.employeeForm.controls['NV_HoTen'].setValue(data.NV_HoTen);
    this.employeeForm.controls['NV_GioiTinh'].setValue(data.NV_GioiTinh);
    this.employeeForm.controls['NV_NgaySinh'].setValue(moment(data.NV_NgaySinh).format('YYYY-MM-DD'));
    this.employeeForm.controls['NV_DiaChi'].setValue(data.NV_DiaChi);
    this.employeeForm.controls['NV_Sdt'].setValue(data.NV_Sdt);
    this.employeeForm.controls['NV_Email'].setValue(data.NV_Email);
    this.employeeForm.controls['CV_Id'].setValue(data.CV_Id);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
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
    if (this.data.id) {
      if (this.employeeForm.valid) {
        Swal.fire({
          title: 'Lưu thông tin nhân viên',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then((result) => {
          if (result.isConfirmed) {
            this.nhanvien.updateById(this.data.id, this.employeeForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Sửa thành công',
                    showConfirmButton: true
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
                }
              }
            );
          }
        });
      }
    } else {
      if (this.employeeForm.valid) {
        Swal.fire({
          title: 'Lưu thông tin nhân viên',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then((result) => {
          if (result.isConfirmed) {
            this.nhanvien.addNew(this.employeeForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thêm mới thành công',
                    showConfirmButton: true
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  }

  cancelClick() {
    this.dialogRef.close();
  }
}
