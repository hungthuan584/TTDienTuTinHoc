import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { TeacherFormComponent } from '../../form/teacher-form/teacher-form.component';
import { teacherDialogData } from '../teacher.component';

@Component({
  selector: 'app-teacher-infomation',
  templateUrl: './teacher-infomation.component.html',
  styleUrls: ['./teacher-infomation.component.scss']
})
export class TeacherInfomationComponent implements OnInit {

  teacher: any;
  account: any;
  constructor(
    public dialogRef: MatDialogRef<TeacherInfomationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teacherDialogData,

    public dialog: MatDialog,
    private giaovien: GiaoVienService,
    private taikhoan: TaiKhoanService,
  ) { }

  ngOnInit(): void {
    this.giaovien.getById(this.data.id).subscribe(
      (result) => {
        this.teacher = result;
      }
    );
    this.taikhoan.getByUsername(this.data.id).subscribe(
      (result) => {
        this.account = result;
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      TeacherFormComponent,
      {
        data: {
          title: 'Sửa thông tin giáo viên',
          id: id
        },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  closeClick() {
    this.dialogRef.close();
  }

  lockAccount(username: string) {
    Swal.fire({
      title: 'Khoá tài khoản',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vẫn khoá'
    }).then((result) => {
      if (result.isConfirmed) {

        this.taikhoan.lockAccount(username).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
              showConfirmButton: true
            }).then(
              () => {
                this.ngOnInit();
              }
            );
          }
        );

      }
    })
  }

  unlockAccount(username: string) {
    Swal.fire({
      title: 'Mở khoá tài khoản',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mở khoá'
    }).then((result) => {
      if (result.isConfirmed) {

        this.taikhoan.unlockAccount(username).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
              showConfirmButton: true
            }).then(
              () => {
                this.ngOnInit();
              }
            );
          }
        );
      }
    })
  }
}
