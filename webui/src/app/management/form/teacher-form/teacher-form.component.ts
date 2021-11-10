import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import Swal from 'sweetalert2';
import { teacherDialogData } from '../../teacher/teacher.component';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  teacherForm!: FormGroup
  isUpdate = false;
  validationMessages: any = {
    GV_HoTen: {
      required: 'Nhập đầy đủ họ tên',
      maxlength: 'Họ tên không được quá dài',
      minlength: 'Họ tên không được quá ngắn'
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
    GV_DanToc: {
      required: 'Nhập dân tộc',
      maxlength: 'Dân tộc không được quá dài',
      minlength: 'Dân tộc không được quá ngắn'
    },
    GV_QuocTich: {
      required: 'Nhập quốc tịch',
      maxlength: 'Quốc tịch không được quá dài',
      minlength: 'Quốc tịch không được quá ngắn'
    },
    GV_Sdt: {
      required: 'Nhập số điện thoại',
      pattern: 'Số điện thoại không đúng'
    },
    GV_Email: {
      required: 'Nhập email',
      email: 'Email không đúng',
      maxlength: 'Email không được quá dài',
      minlength: 'Email không được quá ngắn'
    },
    GV_TrinhDo: {
      required: 'Nhập trình độ',
      maxlength: 'Trình độ nên viêt tắt 1 số từ VD: ThS.CNTT = Thạc Sĩ Công nghệ thông tin',
      minlength: 'Điền rõ học vị + chuyên ngành'
    },
  };

  formErrors: any = {};

  constructor(
    public dialogRef: MatDialogRef<TeacherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teacherDialogData,

    private giaovien: GiaoVienService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      GV_HoTen: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      GV_GioiTinh: ['', Validators.required],
      GV_NgaySinh: ['', Validators.required],
      GV_DiaChi: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      GV_DanToc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      GV_QuocTich: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      GV_Sdt: ['', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      GV_Email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      GV_TrinhDo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });

    this.teacherForm.valueChanges.subscribe((data: any) => {
      this.logValidationErrors(this.teacherForm);
    });

    if (this.data.id) {
      this.giaovien.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }
  }

  setValueForm(data: any) {
    this.teacherForm.controls['GV_HoTen'].setValue(data.GV_HoTen);
    this.teacherForm.controls['GV_GioiTinh'].setValue(data.GV_GioiTinh);
    this.teacherForm.controls['GV_NgaySinh'].setValue(moment(data.GV_NgaySinh).format('YYYY-MM-DD'));
    this.teacherForm.controls['GV_DiaChi'].setValue(data.GV_DiaChi);
    this.teacherForm.controls['GV_DanToc'].setValue(data.GV_DanToc);
    this.teacherForm.controls['GV_QuocTich'].setValue(data.GV_QuocTich);
    this.teacherForm.controls['GV_Sdt'].setValue(data.GV_Sdt);
    this.teacherForm.controls['GV_Email'].setValue(data.GV_Email);
    this.teacherForm.controls['GV_TrinhDo'].setValue(data.GV_TrinhDo);
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
    if (this.data.id) {
      if (this.teacherForm.valid) {
        Swal.fire({
          title: 'Lưu thông tin giáo viên',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then((result) => {
          if (result.isConfirmed) {
            this.giaovien.updateById(this.data.id, this.teacherForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Sửa thành công',
                    showConfirmButton: true
                  }).then(
                    () => {
                      this.dialogRef.close();
                      window.location.reload();
                    }
                  );
                }
              }
            );
          }
        });
      }
    } else {
      if (this.teacherForm.valid) {
        Swal.fire({
          title: 'Lưu thông tin giáo viên',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then((result) => {
          if (result.isConfirmed) {
            this.giaovien.addNew(this.teacherForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thêm mới thành công',
                    showConfirmButton: true
                  }).then(
                    () => {
                      this.dialogRef.close();
                      window.location.reload();
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
