import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiangDayService } from 'src/app/services/giang-day.service';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import Swal from 'sweetalert2';
import { ClassDialogData } from '../../classroom/classroom.component';

@Component({
  selector: 'app-teaching-form',
  templateUrl: './teaching-form.component.html',
  styleUrls: ['./teaching-form.component.scss']
})
export class TeachingFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TeachingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,

    private lophoc: LopHocService,
    private giaovien: GiaoVienService,
    private giangday: GiangDayService,
    private fb: FormBuilder
  ) { }
  teachingForm!: FormGroup;
  dsGiaoVien: any;
  validationMessages: any = {
    GV_Id: {
      required: 'Chọn giáo viên',
    },
  }
  formErrors: any = {};
  class: any;

  ngOnInit(): void {
    this.teachingForm = this.fb.group({
      LH_Id: [this.data.lhId],
      GV_Id: ['', Validators.required]
    });

    this.teachingForm.controls['LH_Id'].setValue(this.data.lhId);

    this.lophoc.getById(this.data.lhId).subscribe(
      (result) => {
        this.class = result;
      }
    );

    this.giaovien.getAll().subscribe(
      (result) => {
        this.dsGiaoVien = result;
      }
    );

    if (this.data.isUpdate == true) {
      this.giangday.getByLH(this.data.lhId).subscribe(
        (result) => {
          this.teachingForm.controls['GV_Id'].setValue(result.GV_Id);
        }
      );
    }

    this.teachingForm.valueChanges.subscribe((data: any) => {
      this.logValidationErrors(this.teachingForm);
    });
  }

  logValidationErrors(group: FormGroup = this.teachingForm): void {
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
    if (this.data.isUpdate == true) {
      if (this.teachingForm.valid) {
        Swal.fire({
          title: 'Cập nhật phân công',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.giangday.updateByLH(this.data.lhId, this.teachingForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Chỉnh sửa thành công'
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
        title: 'Phân công giảng dạy',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.giangday.addNew(this.teachingForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Phân công thành công'
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
  }

  onCancel() {
    this.dialogRef.close();
  }

}
