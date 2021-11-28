import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { StudentFormComponent } from '../../form/student-form/student-form.component';
import { StudentDialogData } from '../student.component';

@Component({
  selector: 'app-student-infomation',
  templateUrl: './student-infomation.component.html',
  styleUrls: ['./student-infomation.component.scss']
})
export class StudentInfomationComponent implements OnInit {

  student: any;
  constructor(
    public dialogRef: MatDialogRef<StudentInfomationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,
    private dialog: MatDialog,
    private hocvien: HocVienService,
    private taikhoan: TaiKhoanService
  ) { }

  ngOnInit(): void {
    this.hocvien.getById(this.data.id).subscribe(
      (result) => {
        this.student = result;
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      StudentFormComponent,
      {
        data: { title: 'Sửa thông tin học viên', id: id },
        autoFocus: false,
        restoreFocus: false
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
