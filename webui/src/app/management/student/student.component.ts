import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
  number1: any;
  number2: any;
  displayedColumns1: string[] = ['stt', 'TK_TenDangNhap', 'HV_Id', 'HV_HoTen', 'HV_GioiTinh', 'HV_NgaySinh', 'HV_NoiSinh', 'HV_Sdt', 'HV_Email', '#'];
  dataSource1!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private hocvien: HocVienService
  ) { }

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  ngOnInit(): void {
    this.hocvien.getStudying().subscribe(
      (data) => {
        this.number1 = data.length;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator1;
      }
    );

    this.hocvien.getStudyed().subscribe(
      (result) => {
        this.number2 = result.length;
        this.dataSource1 = new MatTableDataSource(result);
        this.dataSource1.paginator = this.paginator2;
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
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  infoClick(hvId: string) {
    this.dialog.open(
      StudentInfomationComponent,
      {
        data: { title: 'Thông tin học viên', id: hvId },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
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
        window.location.reload();
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
                    window.location.reload();
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
