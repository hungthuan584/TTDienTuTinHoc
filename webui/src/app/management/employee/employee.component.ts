import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { EmployeeFormComponent } from '../form/employee-form/employee-form.component';
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

  displayedColumns: string[] = ['stt', 'taikhoan', 'id', 'hoten', 'gioitinh', 'diachi', 'email', 'sdt', 'chucvu', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private nhanvien: NhanVienService
  ) { }

  ngOnInit(): void {
    this.nhanvien.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
      }
    );
  }

  filterData($event: any) {

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
        data:{title: 'Thông tin nhân viên', id: id},
        autoFocus: false,
        restoreFocus: false
      }
    )
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

  }

}
