import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import Swal from 'sweetalert2';
import { examDialogData } from '../../exam/exam.component';

@Component({
  selector: 'app-examination-form',
  templateUrl: './examination-form.component.html',
  styleUrls: ['./examination-form.component.scss']
})
export class ExaminationFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExaminationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: examDialogData,

    private dotthi: DotThiService,
    private kythi: KyThiService,
    private chungchi: ChungChiService,
    private fb: FormBuilder
  ) { }

  dotThi: any;
  dsKyThi: any;
  dsChungChi: any;

  examinationForm!: FormGroup;
  validationMessages: any = {
    CC_Id: {
      required: 'Chọn chứng chỉ'
    },
    KT_NgayThi: {
      required: 'Chọn ngày thi'
    },
    DT_Id: {
      required: 'Chọn đợt thi'
    }
  };

  formErrors: any = {};

  ngOnInit(): void {
    this.examinationForm = this.fb.group({
      CC_Id: ['', Validators.required],
      KT_NgayThi: ['', Validators.required],
      DT_Id: ['']
    });

    this.examinationForm.controls['DT_Id'].setValue(this.data.dtId);
    this.dotthi.getById(this.data.dtId).subscribe(
      (result) => {
        this.dotThi = result;
      }
    )

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

    if (this.data.id) {
      this.kythi.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }

    this.examinationForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.examinationForm);
    });
  }

  setValueForm(data: any) {
    this.examinationForm.controls['CC_Id'].setValue(data.CC_Id);
    this.examinationForm.controls['CC_Id'].disable();
    this.examinationForm.controls['KT_NgayThi'].setValue(moment(data.KT_NgayThi).format('YYYY-MM-DD'));
  }

  logValidationErrors(group: FormGroup = this.examinationForm): void {
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
      if (this.examinationForm.valid) {
        Swal.fire({
          title: 'Cập nhật kỳ thì?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.kythi.updateById(this.data.id, this.examinationForm.value).subscribe(
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
      if (this.examinationForm.valid) {
        Swal.fire({
          title: 'Mở kỳ thì?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Mở'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.kythi.addNew(this.examinationForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
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
    }
  }

  closeClick() {
    this.dialogRef.close();
  }

}
