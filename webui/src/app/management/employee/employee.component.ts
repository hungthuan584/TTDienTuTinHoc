import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { EmployeeFormComponent } from '../form/employee-form/employee-form.component';
import { PermissionComponent } from '../permission/permission.component';
import { EmployeeInfomationComponent } from './employee-infomation/employee-infomation.component';

export interface employeeDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'taikhoan', 'id', 'hoten', 'gioitinh', 'email', 'sdt', 'chucvu', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private nhanvien: NhanVienService,
    private authService: AuthService,
    private taikhoan: TaiKhoanService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.nhanvien.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  showActionButton(user: any, lv: any) {
    return this.authService.isUser(user, lv);
  }

  addClick() {
    this.dialog.open(
      EmployeeFormComponent,
      {
        data: { title: 'Thêm nhân viên' },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  infoClick(id: string) {
    this.dialog.open(
      EmployeeInfomationComponent,
      {
        data: { title: 'Thông tin nhân viên', id: id },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  changePermission(username: any) {
    this.dialog.open(
      PermissionComponent,
      {
        data: { title: 'Phân quyền người dùng', id: username },
        autoFocus: false,
        restoreFocus: false
      }
    );
  }

  editClick(id: string) {
    this.dialog.open(
      EmployeeFormComponent,
      {
        data: { title: 'Sửa thông tin nhân viên', id: id },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  deleteClick(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Xoá nhân viên?',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      confirmButtonColor: '#0984e3',
      cancelButtonColor: '#485460'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.nhanvien.deleteById(id).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Xoá thành công',
                }).then(
                  () => {
                    window.location.reload();
                  }
                );
              }
            }
          );
        }
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
                    window.location.reload();
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
                    window.location.reload();
                  }
                );
              }
            }
          );
        }
      }
    );
  }
}
