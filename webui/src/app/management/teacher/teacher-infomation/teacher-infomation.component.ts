import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { TeacherFormComponent } from '../../form/teacher-form/teacher-form.component';
import { teacherDialogData } from '../../teacher/teacher.component';

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
    private taikhoan: TaiKhoanService
  ) { }

  ngOnInit(): void {
    this.giaovien.getById(this.data.id).subscribe(
      (result) => {
        this.teacher = result;
        console.log('Data', this.teacher);

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
        this.ngOnInit();
      }
    );
  }

  lockAccount(username: any) {
    Swal.fire({
      icon: 'question',
      title: 'Khoá tài khoản?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khoá'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.taikhoan.lockAccount(username).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Khoá tài khoản'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  unlockAccount(username: any) {
    Swal.fire({
      icon: 'question',
      title: 'Mở khoá tài khoản?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mở khoá'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.taikhoan.unlockAccount(username).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã mở khoá'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  resetPassword(username: any) {
    Swal.fire({
      icon: 'question',
      title: 'Đặt lại mật khẩu?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đặt lại'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.taikhoan.resetPassword(username).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đặt lại'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  closeClick() {
    this.dialogRef.close();
  }
}
