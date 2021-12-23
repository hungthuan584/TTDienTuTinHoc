import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DanhSachPhongThiService } from 'src/app/services/danh-sach-phong-thi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { PhongHocService } from 'src/app/services/phong-hoc.service';
import { ThoiGianThiService } from 'src/app/services/thoi-gian-thi.service';
import Swal from 'sweetalert2';
import { examDialogData } from '../../exam/exam.component';

@Component({
  selector: 'app-arrange-exam',
  templateUrl: './arrange-exam.component.html',
  styleUrls: ['./arrange-exam.component.scss']
})
export class ArrangeExamComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ArrangeExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: examDialogData,
    private fb: FormBuilder,
    private dotthi: DotThiService,
    private kythi: KyThiService,
    private phonghoc: PhongHocService,
    private thoigianthi: ThoiGianThiService,
    private danhsachphongthi: DanhSachPhongThiService
  ) { }

  arrangeRoom!: FormGroup;
  dsKyThi: any;
  validationMessages: any = {
    PH_Id: {
      required: 'Chọn phòng thi',
    },
    TGT_Id: {
      required: 'Chọn thời gian thi'
    }
  }

  formErrors: any = {}
  dsPhongHoc: any;
  dsThoiGian: any;
  exam: any;
  infoKyThi: any;

  ngOnInit(): void {
    this.arrangeRoom = this.fb.group({
      KT_Id: ['', Validators.required],
      PH_Id: ['', Validators.required],
      TGT_Id: ['', Validators.required]
    });

    this.dotthi.getById(this.data.dtId).subscribe(
      (result) => {
        this.exam = result;
      }
    );

    this.phonghoc.getAll().subscribe(
      (result) => {
        this.dsPhongHoc = result;
      }
    );

    this.kythi.getByDotThi(this.data.dtId).subscribe(
      (result) => {
        this.dsKyThi = result;
        this.setValue(result);
      }
    );

    this.thoigianthi.getAll().subscribe(
      (result) => {
        this.dsThoiGian = result;
      }
    );

    this.arrangeRoom.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.arrangeRoom);
    });


  }

  logValidationErrors(group: FormGroup = this.arrangeRoom): void {
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

  setValue(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].KT_Id.slice(0, 6) == this.data.CC_Id) {
        this.arrangeRoom.controls['KT_Id'].setValue(data[i].KT_Id);
      }
    }

    this.kythi.getById(this.arrangeRoom.controls['KT_Id'].value).subscribe(
      (result) => {
        this.infoKyThi = result;
      }
    );
  }

  onSubmit() {
    if (this.arrangeRoom.valid) {
      Swal.fire({
        icon: 'question',
        title: 'Xếp phòng thi',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xếp'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            var data = {
              HV_Id: this.data.hvId,
              KT_Id: this.arrangeRoom.controls['KT_Id'].value,
              PH_Id: this.arrangeRoom.controls['PH_Id'].value,
              TGT_Id: this.arrangeRoom.controls['TGT_Id'].value
            }
            this.danhsachphongthi.addOne(data).subscribe(
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
        title: 'Nhập đầy đủ thông tin'
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
