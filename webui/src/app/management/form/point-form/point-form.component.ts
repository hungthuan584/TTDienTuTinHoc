import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { KetQuaThiService } from 'src/app/services/ket-qua-thi.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import Swal from 'sweetalert2';
import { pointDialogData } from '../../exam/exam-point/exam-point.component';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.scss']
})
export class PointFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PointFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pointDialogData,

    private fb: FormBuilder,
    private hocvien: HocVienService,
    private ketquathi: KetQuaThiService,
    private kythi: KyThiService
  ) { }

  student: any;
  exam: any;
  pointForm!: FormGroup;
  validationMessages: any = {
    KQ_LyThuyet: {
      required: 'Nhập điểm lý thuyết',
      max: 'Lớn nhất là 10',
      min: 'Nhỏ nhất là 0'
    },
    KQ_ThucHanh: {
      required: 'Nhập điểm thực hành',
      max: 'Lớn nhất là 10',
      min: 'Nhỏ nhất là 0'
    }
  };

  formErrors: any = {};

  ngOnInit(): void {
    this.pointForm = this.fb.group({
      KQ_LyThuyet: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      KQ_ThucHanh: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.pointForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.pointForm);
    });

    this.hocvien.getById(this.data.hvId).subscribe(
      (result) => {
        this.student = result;
      }
    );

    this.kythi.getById(this.data.ktId).subscribe(
      (result) => {
        this.exam = result;
      }
    );

    if (this.data.isUpdate) {
      this.ketquathi.getInfo(this.data.hvId, this.data.ktId).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }
  }

  setValueForm(data: any) {
    this.pointForm.controls['KQ_LyThuyet'].setValue(data.KQ_LyThuyet);
    this.pointForm.controls['KQ_ThucHanh'].setValue(data.KQ_ThucHanh);
  }

  logValidationErrors(group: FormGroup = this.pointForm): void {
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
    if (this.pointForm.valid) {
      if (this.data.isUpdate) {
        Swal.fire({
          title: 'Cập nhật điểm',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.ketquathi.updateByHv(this.data.hvId, this.data.ktId, this.pointForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật thành công'
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: result.message
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        Swal.fire({
          title: 'Luư điểm',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              let data = {
                HV_Id: this.data.hvId,
                KT_Id: this.data.ktId,
                KQ_LyThuyet: this.pointForm.controls['KQ_LyThuyet'].value,
                KQ_ThucHanh: this.pointForm.controls['KQ_ThucHanh'].value
              }
              this.ketquathi.addPoint(data).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Lưu thành công'
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: result.message
                    });
                  }
                }
              );
            }
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nhập đầy đủ thông tin'
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
