import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import Swal from 'sweetalert2';
import { StudentFormComponent } from '../form/student-form/student-form.component';
import { StudentInfomationComponent } from './student-infomation/student-infomation.component';

export interface StudentDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'TK_TenDangNhap', 'HV_Id', 'HV_HoTen', 'HV_GioiTinh', 'HV_NgaySinh', 'HV_NoiSinh', 'HV_Sdt', 'HV_Email', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private hocvien: HocVienService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.hocvien.getAll().subscribe(
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
      StudentFormComponent,
      {
        data: { title: 'Thêm học viên' },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  infoClick(hvId: string) {
    this.dialog.open(
      StudentInfomationComponent,
      {
        data: { title: 'Thông tin học viên', id: hvId },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  editClick(hvId: string) {
    this.dialog.open(
      StudentFormComponent,
      {
        data: { title: 'Sửa thông tin học viên', id: hvId },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteClick(hvId: string) {
    Swal.fire({
      title: 'Xoá học viên?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.hocvien.deleteById(hvId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Xoá thành công',
                  showConfirmButton: true
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
    )
  }

}
