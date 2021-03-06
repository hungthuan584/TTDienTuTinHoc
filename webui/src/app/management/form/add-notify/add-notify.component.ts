import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { ClassDialogData } from '../../classroom/classroom.component';

@Component({
  selector: 'app-add-notify',
  templateUrl: './add-notify.component.html',
  styleUrls: ['./add-notify.component.scss']
})
export class AddNotifyComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddNotifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,

    private fb: FormBuilder,
    private lophoc: LopHocService,
    private thongbao: ThongBaoService,
    private tokenStorage: TokenStorageService,
    private nhanvien: NhanVienService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  notifyForm!: FormGroup;
  dsLopHoc: any;
  user: any;

  ngOnInit(): void {
    this.notifyForm = this.fb.group({
      LH_Id: [''],
      TB_NoiDung: ['', Validators.required],
      TB_CreateBy: [''],
      TB_UpdateBy: ['']
    });

    this.lophoc.getOpening().subscribe(
      (result) => {
        this.dsLopHoc = result;
      }
    );

    this.notifyForm.controls['LH_Id'].setValue(this.data.lhId);
    this.notifyForm.controls['LH_Id'].disable();

    this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.user = result;
      }
    );

    if (this.data.tbId) {
      this.thongbao.getById(this.data.tbId).subscribe(
        (result) => {
          this.setFormValue(result);
        }
      );

      this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
        (result) => {
          this.notifyForm.controls['TB_UpdateBy'].setValue(result.NV_HoTen);
        }
      );


    } else {
      this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
        (result) => {
          this.notifyForm.controls['TB_CreateBy'].setValue(result.NV_HoTen);
        }
      );
    }
  }

  setFormValue(data: any) {
    this.notifyForm.controls['TB_NoiDung'].setValue(data.TB_NoiDung);
  }

  onSubmit() {
    if (this.data.tbId) {
      if (this.notifyForm.valid) {
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
              this.notifyForm.controls['LH_Id'].enable();
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
        )
      } else {
        Swal.fire({
          icon: 'warning',
          title: '??i???n n???i dung th??ng b??o'
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
