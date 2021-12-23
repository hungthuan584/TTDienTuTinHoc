import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DotThiService } from 'src/app/services/dot-thi.service';
import Swal from 'sweetalert2';
import { examDialogData } from '../../exam/exam.component';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: examDialogData,

    private dotthi: DotThiService,
    private fb: FormBuilder
  ) { }

  examForm!: FormGroup;
  validationMessages: any = {
    DT_Ten: {
      required: 'Nhập tên đợt thi'
    },
    DT_HanDangKy: {
      required: 'Chọn thời hạn đăng ký'
    }
  };

  formErrors: any = {};
  dsDotThi: any;

  ngOnInit(): void {
    this.examForm = this.fb.group({
      DT_Ten: ['', Validators.required],
      DT_HanDangKy: ['', Validators.required]
    });

    this.examForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.examForm);
    });

    if (this.data.id) {
      this.dotthi.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }
  }

  logValidationErrors(group: FormGroup = this.examForm): void {
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

  setValueForm(data: any) {
    this.examForm.controls['DT_Ten'].setValue(data.DT_Ten);
    this.examForm.controls['DT_HanDangKy'].setValue(moment(data.DT_HanDangKy).format('YYYY-MM-DD'));
  }

  onSubmit() {
    if (this.data.id) {
      if (this.examForm.valid) {
        Swal.fire({
          title: 'Cập nhật thông tin',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.dotthi.updateById(this.data.id, this.examForm.value).subscribe(
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
          icon: 'error',
          title: 'Nhập tất cả các trường'
        });
      }
    } else {
      if (this.examForm.valid) {
        Swal.fire({
          title: 'Thêm đợt thi',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Thêm'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.dotthi.addNew(this.examForm.value).subscribe(
                (DotThi) => {
                  if (DotThi.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Thêm thành công'
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: DotThi.message
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Nhập tất cả các trường'
        });
      }
    }
  }

  closeClick() {
    this.dialogRef.close();
  }

}
