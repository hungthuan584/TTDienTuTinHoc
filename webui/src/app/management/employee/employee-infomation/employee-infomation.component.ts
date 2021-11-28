import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { EmployeeFormComponent } from '../../form/employee-form/employee-form.component';
import { employeeDialogData } from '../employee.component';

@Component({
  selector: 'app-employee-infomation',
  templateUrl: './employee-infomation.component.html',
  styleUrls: ['./employee-infomation.component.scss']
})
export class EmployeeInfomationComponent implements OnInit {

  employee!: any;

  constructor(
    public dialogRef: MatDialogRef<EmployeeInfomationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: employeeDialogData,

    public dialog: MatDialog,
    private nhanvien: NhanVienService,
    private taikhoan: TaiKhoanService
  ) { }

  ngOnInit(): void {
    this.nhanvien.getById(this.data.id).subscribe(
      (result) => {
        this.employee = result;
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      EmployeeFormComponent,
      {
        data: { title: 'Sửa thông tin nhân viên', id: id },
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
