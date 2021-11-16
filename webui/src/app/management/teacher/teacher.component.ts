import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import Swal from 'sweetalert2';
import { TeacherFormComponent } from '../form/teacher-form/teacher-form.component';
import { TeacherInfomationComponent } from './teacher-infomation/teacher-infomation.component';

export interface teacherDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'taikhoan', 'id', 'hoten', 'gioitinh', 'diachi', 'email', 'sdt', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private giaovien: GiaoVienService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.giaovien.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  addClick() {
    this.dialog.open(
      TeacherFormComponent,
      {
        data: { title: 'Thêm giáo viên' },
        autoFocus: false,
        restoreFocus: false
      },
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  infoClick(id: any) {
    this.dialog.open(
      TeacherInfomationComponent,
      {
        data: {
          title: 'Thông tin giáo viên',
          id: id
        },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
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
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  deleteClick(id: any) {
    Swal.fire({
      title: 'Xoá giáo viên?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá'
    }).then((result) => {
      if (result.isConfirmed) {
        this.giaovien.deleteById(id).subscribe(
          (result) => {
            if (result.status == 1) {
              Swal.fire({
                icon: 'success',
                title: 'Xoá thành công',
                showConfirmButton: true
              }).then(
                () => {
                  window.location.reload();
                }
              );
            }
          }
        );
      }
    })
  }
}
