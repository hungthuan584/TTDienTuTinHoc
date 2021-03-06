import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiangDayService } from 'src/app/services/giang-day.service';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { dialogData } from '../../classroom/classroom.component';

@Component({
  selector: 'app-notify-form',
  templateUrl: './notify-form.component.html',
  styleUrls: ['./notify-form.component.scss']
})
export class NotifyFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotifyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,

    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private thongbao: ThongBaoService,
    private giaovien: GiaoVienService,
    private giangday:GiangDayService,
    private lophoc: LopHocService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  notifyForm!: FormGroup;
  dsLopHoc: any;

  ngOnInit(): void {
    this.notifyForm = this.fb.group({
      LH_Id: [''],
      TB_NoiDung: ['', Validators.required]
    });

    this.giangday.getByGV(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.dsLopHoc = result;
      }
    );

    this.notifyForm.controls['LH_Id'].setValue(this.data.id);
    this.notifyForm.controls['LH_Id'].disable();

    if (this.data.isUpdate == true) {
      this.thongbao.getById(this.data.tbId).subscribe(
        (result) => {
          this.notifyForm.controls['TB_NoiDung'].setValue(result.TB_NoiDung);
        }
      );
    }
  }

  onSubmit() {
    if (this.data.isUpdate == true) {
      if (this.notifyForm.valid) {
        this.notifyForm.controls['LH_Id'].enable();
        Swal.fire({
          title: 'C???p nh??t th??ng b??o',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'C???p nh???t'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.thongbao.updateById(this.data.tbId, this.notifyForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'C???p nh???t th??nh c??ng'
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'L???i!'
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
          title: '??i???n n???i dung th??ng b??o'
        });
      }
    } else {
      this.notifyForm.controls['LH_Id'].enable();
      if (this.notifyForm.valid) {
        Swal.fire({
          title: '????ng th??ng b??o',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '????ng'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.thongbao.addNew(this.notifyForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: '????ng th??nh c??ng'
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'L???i!'
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
          title: '??i???n n???i dung th??ng b??o'
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
