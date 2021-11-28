import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import Swal from 'sweetalert2';
import { InfoClassComponent } from './info-class/info-class.component';
import { ClassFormComponent } from '../form/class-form/class-form.component';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { ClassListComponent } from './class-list/class-list.component';
import { NotifyComponent } from '../notify/notify.component';

export interface ClassDialogData {
  title: string;
  lhId: string;
  tbId: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'tenlop', 'thoigianhoc', 'ngaykhaigiang', 'soluong', 'phonghoc', 'giaovien', '#'];
  dataSource!: MatTableDataSource<any>;
  displayedColumns1: string[] = ['stt', 'id', 'tenlop', 'thoigianhoc', 'ngaykhaigiang', 'soluong', 'phonghoc', 'giaovien', 'ngayhoanthanh', '#'];
  dataSource1!: MatTableDataSource<any>;

  number: any;

  constructor(
    public dialog: MatDialog,
    private lophoc: LopHocService,
  ) { }
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;

  ngOnInit(): void {
    this.lophoc.getOpening().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.lophoc.getCompleted().subscribe(
      (result) => {
        this.dataSource1 = new MatTableDataSource(result);
        this.dataSource1.paginator = this.paginator1;
      }
    );
  }

  addClick() {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Thêm lớp học' },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  infoClick(id: string) {
    this.dialog.open(
      InfoClassComponent,
      {
        data: { title: 'Thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  postNotify(lhId: string) {
    this.dialog.open(
      NotifyComponent,
      {
        data: { title: 'Nội dung thông báo', lhId: lhId },
        autoFocus: false,
        restoreFocus: false
      }
    )
  }

  editClick(id: string) {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Sửa thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    )
  }

  completeClick(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Hoàn thành lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hoàn thành',
      cancelButtonText: 'Huỷ'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.lophoc.isComplete(id).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã hoàn thành',
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
    );
  }

  showListStudent(lhId: any) {
    this.dialog.open(
      ClassListComponent,
      {
        data: {
          title: 'Danh sách học viên',
          lhId: lhId
        },
        autoFocus: false,
        restoreFocus: false
      }
    );
  }
}
