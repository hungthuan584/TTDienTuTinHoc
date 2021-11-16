import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { PhongHocService } from 'src/app/services/phong-hoc.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ClassDialogData } from '../../home/home.component';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  dslopDT: any = [];
  dsPH: any = [];
  dsGV: any = [];
  isUpdate = false;

  validationMessages: any = {
    LDT_Id: {
      required: 'Chọn lớp học'
    },
    LH_SiSo: {
      required: 'Nhập sỉ số lớp',
      max: 'Sỉ số không quá 60',
      min: 'Sỉ số không ít hơn 10'
    },
    LH_NgayHoc: {
      required: 'Nhập ngày học VD: T2,T4,T6'
    },
    LH_GioBatDau: {
      required: 'Nhập giờ bắt đầu lớp học'
    },
    LH_GioKetThuc: {
      required: 'Nhập giờ kết thúc lớp học'
    },
    PH_Id: {
      required: 'Chọn phòng học'
    },
    LH_NgayKhaiGiang: {
      required: 'Chọn ngày khai giảng'
    },
    GV_Id: {
      required: 'Chọn giáo viên giảng dạy'
    }
  }

  classForm!: FormGroup;
  formErrors: any = {}

  constructor(
    public dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,

    private lopdaotao: LopDaoTaoService,
    private phonghoc: PhongHocService,
    private giaovien: GiaoVienService,
    private fb: FormBuilder,
    private lophoc: LopHocService
  ) { }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      LDT_Id: ['', Validators.required],
      LH_SiSo: ['', [Validators.required, Validators.max(80), Validators.min(10)]],
      LH_NgayHoc: ['', Validators.required],
      LH_GioBatDau: ['', Validators.required],
      LH_GioKetThuc: ['', Validators.required],
      PH_Id: ['', Validators.required],
      LH_NgayKhaiGiang: ['', Validators.required],
      GV_Id: ['', Validators.required]
    });

    this.lopdaotao.getAll().subscribe(
      (result) => {
        this.dslopDT = result;
      }
    );
    this.phonghoc.getAll().subscribe(
      (result) => {
        this.dsPH = result;
      }
    );
    this.giaovien.getAll().subscribe(
      (result) => {
        this.dsGV = result;
      }
    );

    if (this.data.lhId) {
      this.isUpdate = true;
      this.lophoc.getById(this.data.lhId).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }


  }

  setValueForm(data: any) {
    this.classForm.controls['LDT_Id'].setValue(data.LDT_Id);
    this.classForm.controls['LDT_Id'].disable();
    this.classForm.controls['LH_SiSo'].setValue(data.LH_SiSo);
    this.classForm.controls['LH_NgayHoc'].setValue(data.LH_NgayHoc);
    this.classForm.controls['LH_GioBatDau'].setValue(data.LH_GioBatDau);
    this.classForm.controls['LH_GioKetThuc'].setValue(data.LH_GioKetThuc);
    this.classForm.controls['PH_Id'].setValue(data.PH_Id);
    this.classForm.controls['LH_NgayKhaiGiang'].setValue(moment(data.LH_NgayKhaiGiang).format('YYYY-MM-DD'));
    this.classForm.controls['GV_Id'].setValue(data.GV_Id);
  }

  logValidationErrors(group: FormGroup = this.classForm): void {
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
    if (this.data.lhId) {
      if (this.classForm.valid) {
        this.classForm.controls['LDT_Id'].enable();
        Swal.fire({
          icon: 'question',
          title: 'Cập nhật thông tin lớp học',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.lophoc.updateById(this.data.lhId, this.classForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật thành công',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  }
                }
              )
            }
          }
        );
      }
    } else {
      if (this.classForm.valid) {
        Swal.fire({
          icon: 'question',
          title: 'Lưu thông tin lớp học',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.lophoc.addNew(this.classForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Thêm thành công',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  }
                }
              )
            }
          }
        );
      }
    }
  }

  cancelClick() {
    this.dialogRef.close();
  }
}
